class AddSevereSymptomOnsetToPatients < ActiveRecord::Migration[6.0]
  def change
    add_column :patients, :severe_symptom_onset, :date
  end
end
