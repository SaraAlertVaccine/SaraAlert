# frozen_string_literal: true

FactoryBot.define do
  factory :dosage do
    patient { create(:patient) }
  end
end
