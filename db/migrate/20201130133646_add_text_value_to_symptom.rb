class AddTextValueToSymptom < ActiveRecord::Migration[6.0]
  def change
    add_column :symptoms, :text_value, :string
  end
end
