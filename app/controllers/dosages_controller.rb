# frozen_string_literal: true

# DosagesController: Vaccine dosage administered
class DosagesController < ApplicationController
  before_action :authenticate_user!

  def create
    redirect_to root_url && return unless current_user.can_create_patient_dosages?
    dosage = Dosage.new(dosage_params)
    dosage.patient_id = params.permit(:patient_id)[:patient_id]
    dosage.save
    History.vaccine_dosage(
      patient: params.permit(:patient_id)[:patient_id],
      created_by: current_user.email,
      comment: "User added a vaccine dosage (ID: #{dosage.id})."
    )
  end

  def update
    redirect_to root_url && return unless current_user.can_edit_patient_dosages?
    dosage = Dosage.find_by(id: params.permit(:id)[:id])
    dosage.update(dosage_params)
    dosage.save
    History.vaccine_dosage_edit(patient: params.permit(:patient_id)[:patient_id],
                                created_by: current_user.email,
                                comment: "User edited a vaccine dosage (ID: #{dosage.id}).")
  end

  private

  def dosage_params
    params.permit(
      :cvx, :manufacturer, :expiration_date, :lot_number, :date_given, :sending_org,
      :admin_route, :admin_suffix, :admin_site, :dose_number,
      :facility_name, :facility_type, :facility_address
    )
  end
end
