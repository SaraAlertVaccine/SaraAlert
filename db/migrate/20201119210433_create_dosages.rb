class CreateDosages < ActiveRecord::Migration[6.0]
  def change
    create_table :dosages do |t|
      t.references :patient, index: true

      # Vaccine information
      t.string :cvx
      t.string :manufacturer
      t.date :expiration_date
      t.string :lot_number

      # Administration
      t.date :date_given
      t.string :sending_org
      t.string :admin_route
      t.string :admin_suffix
      t.string :admin_site
      t.integer :dose_number

      t.timestamps
    end
  end
end
