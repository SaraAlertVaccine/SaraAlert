# frozen_string_literal: true

# Dosage: represents a vaccine dosage
class Dosage < ApplicationRecord
  belongs_to :patient

  # validates :date_given, earliest_date: { date: Date.new(2020, 12, 1) },
  #             latest_date: { date: Time.now.to_date },
  #             if: -> {date_given_changed?}
  # validates :admin_site, inclusion: { in: [nil, '', 'deltoid-l', 'deltoid-r', 'thigh-l', 'thigh-r', 'gluteal-l', 'gluteal-r']}

  # after_save :update_patient_linelist_after_save
  # before_destroy :update_patient_linelist_before_destroy

  # Information about this dosage
  def details
    {
      patient_id: patient_id || '',
      dose_number: dose_number || '',
      cvx: cvx || '',
      manufacturer: manufacturer || '',
      expiration_date: expiration_date || '',
      lot_number: lot_number || '',
      date_given: date_given || '',
      sending_org: sending_org || '',
      admin_route: admin_route || '',
      admin_suffix: admin_suffix || '',
      admin_site: admin_site || '',
      dosage_created_at: created_at || '',
      dosage_updated_at: updated_at || ''
    }
  end

  #   def update_patient_linelist_after_save
  #     patient.update(
  #       latest_positive_lab_at: patient.laboratories.where(result: 'positive').maximum(:specimen_collection),
  #       negative_lab_count: patient.laboratories.where(result: 'negative').size
  #     )
  #   end

  #   def update_patient_linelist_before_destroy
  #     patient.update(
  #       latest_positive_lab_at: patient.laboratories.where.not(id: id).where(result: 'positive').maximum(:specimen_collection),
  #       negative_lab_count: patient.laboratories.where.not(id: id).where(result: 'negative').size
  #     )
  #   end
end
