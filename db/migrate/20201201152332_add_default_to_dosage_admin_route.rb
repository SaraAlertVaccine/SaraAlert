class AddDefaultToDosageAdminRoute < ActiveRecord::Migration[6.0]
  def change
    change_column :dosages, :admin_route, :string, :default => 'IM'
  end
end
