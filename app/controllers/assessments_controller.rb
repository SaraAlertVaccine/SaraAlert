# frozen_string_literal: true

# AssessmentsController: for assessment actions
class AssessmentsController < ApplicationController
  before_action :check_patient_token, only: %i[new create update]
  protect_from_forgery except: %i[new_from_email]

  def index; end

  def new_from_email
    redirect_to new_patient_assessment_url(params[:patient_submission_token])
  end

  def new
    if ADMIN_OPTIONS['report_mode']
      @assessment = Assessment.new
      @patient_submission_token = params[:patient_submission_token]
      reporting_condition = Jurisdiction.find_by_id(params[:jurisdiction_id]).hierarchical_condition_unpopulated_symptoms
      @symptoms = reporting_condition.symptoms
      @threshold_hash = reporting_condition.threshold_condition_hash
    else
      @assessment = Assessment.new
      @patient_submission_token = params[:patient_submission_token]
      reporting_condition = Patient.find_by(submission_token: params[:patient_submission_token]).jurisdiction.hierarchical_condition_unpopulated_symptoms
      @symptoms = reporting_condition.symptoms
      @threshold_hash = reporting_condition.threshold_condition_hash
    end
  end

  def create
    if ADMIN_OPTIONS['report_mode']
      assessment_placeholder = {}
      assessment_placeholder = assessment_placeholder.merge(params.permit(:threshold_hash).to_h)
      assessment_placeholder = assessment_placeholder.merge(params.permit({ symptoms: %i[name value type label notes] }).to_h)
      assessment_placeholder = assessment_placeholder.merge(params.permit(:patient_submission_token).to_h)
      ProduceAssessmentJob.perform_later assessment_placeholder
    else
      # The patient providing this assessment is identified through the submission_token
      patient = Patient.find_by(submission_token: params.permit(:patient_submission_token)[:patient_submission_token])

      redirect_to root_url unless patient
      threshold_condition_hash = params.permit(:threshold_hash)[:threshold_hash]
      threshold_condition = ThresholdCondition.where(threshold_condition_hash: threshold_condition_hash).first

      redirect_to root_url unless threshold_condition

      reported_symptoms_array = params.permit({ symptoms: %i[name value type label notes] }).to_h['symptoms']

      typed_reported_symptoms = Condition.build_symptoms(reported_symptoms_array)

      reported_condition = ReportedCondition.new(symptoms: typed_reported_symptoms, threshold_condition_hash: threshold_condition_hash)

      @assessment = Assessment.new(reported_condition: reported_condition)
      @assessment.symptomatic = @assessment.symptomatic?
      @assessment.patient = patient

      # Determine if a user created this assessment or a monitoree
      if current_user.nil?
        @assessment.who_reported = 'Monitoree'
        @assessment.save!
      else
        @assessment.who_reported = current_user.email
        @assessment.save!
        history = History.new
        history.created_by = current_user.email
        comment = 'User created a new subject report. ID: ' + @assessment.id.to_s
        history.comment = comment
        history.patient = patient
        history.history_type = 'Report Created'
        history.save!
      end
      redirect_to(patient_assessments_url)
    end
  end

  def update
    redirect_to root_url unless current_user&.can_edit_patient_assessments?
    patient = Patient.find_by(submission_token: params.permit(:patient_submission_token)[:patient_submission_token])
    assessment = Assessment.find_by(id: params.permit(:id)[:id])
    reported_symptoms_array = params.permit({ symptoms: %i[name value type label notes] }).to_h['symptoms']

    typed_reported_symptoms = Condition.build_symptoms(reported_symptoms_array)

    assessment.reported_condition.symptoms = typed_reported_symptoms
    assessment.symptomatic = assessment.symptomatic?
    # Monitorees can't edit their own assessments, so the last person to touch this assessment was current_user
    assessment.who_reported = current_user.email

    # Attempt to save and continue; else if failed redirect to index
    return unless assessment.save!

    history = History.new
    history.created_by = current_user.email
    comment = 'User updated an existing subject report.'
    history.comment = comment
    history.patient = patient
    history.history_type = 'Report Updated'
    history.save!
    redirect_to(patient_assessments_url) && return
  end

  def check_patient_token
    redirect_to(root_url) && return if params.nil? || params[:patient_submission_token].nil?
    patient = Patient.find_by(submission_token: params.permit(:patient_submission_token)[:patient_submission_token])
    redirect_to(root_url) && return if patient.nil?
  end
end
