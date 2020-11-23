class AddSeverityToSymptoms < ActiveRecord::Migration[6.0]
    def change
      add_column :symptoms, :severity, :integer
    end
  end
  