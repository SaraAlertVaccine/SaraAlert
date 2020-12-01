# frozen_string_literal: true

# DosagesController: Vaccine dosage administered
class DosagesController < ApplicationController
  before_action :authenticate_user!

  def create
    redirect_to root_url && return unless current_user.can_create_patient_dosages?
    dosage = Dosage.new(dosage_params)
    # dosage = Dosage.new(
    #   cvx: params.permit(:cvx)[:cvx],
    #   manufacturer: params.permit(:manufacturer)[:manufacturer],
    #   expiration_date: params.permit(:expiration_date)[:expiration_date],
    #   lot_number: params.permit(:lot_number)[:lot_number],

    #   date_given: params.permit(:date_given)[:date_given],
    #   sending_org: params.permit(:sending_org)[:sending_org],
    #   admin_route: params.permit(:admin_route)[:admin_route],
    #   admin_suffix: params.permit(:admin_suffix)[:admin_suffix],
    #   admin_site: params.permit(:admin_site)[:admin_site],
    #   dose_number: params.permit(:dose_number)[:dose_number]
    # )
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
    # dosage.update(
    #   cvx: params.permit(:cvx)[:cvx],
    #   manufacturer: params.permit(:manufacturer)[:manufacturer],
    #   expiration_date: params.permit(:expiration_date)[:expiration_date],
    #   lot_number: params.permit(:lot_number)[:lot_number],

    #   date_given: params.permit(:date_given)[:date_given],
    #   sending_org: params.permit(:sending_org)[:sending_org],
    #   admin_route: params.permit(:admin_route)[:admin_route],
    #   admin_suffix: params.permit(:admin_suffix)[:admin_suffix],
    #   admin_site: params.permit(:admin_site)[:admin_site],
    #   dose_number: params.permit(:dose_number)[:dose_number])
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
