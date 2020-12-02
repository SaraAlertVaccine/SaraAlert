# frozen_string_literal: true

FactoryBot.define do
  factory :text_symptom, parent: :symptom, class: 'TextSymptom' do
    type { 'TextSymptom' }
    text_value { '' }
  end
end
