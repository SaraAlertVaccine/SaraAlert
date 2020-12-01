class AddFacilityInfoToDosage < ActiveRecord::Migration[6.0]
  def up
    add_column :dosages, :facility_name, :string
    add_column :dosages, :facility_type, :string
    add_column :dosages, :facility_address, :string
  end

  def down
    remove_column :dosages, :facility_name
    remove_column :dosages, :facility_type
    remove_column :dosages, :facility_address
  end
end
