FactoryBot.define do
  factory :dosage do
    patient { create(:patient) }
  end
end
