class AddOtherRaceToPatients < ActiveRecord::Migration[6.0]
  def change
    add_column :patients, :other_race, :boolean
  end
end
