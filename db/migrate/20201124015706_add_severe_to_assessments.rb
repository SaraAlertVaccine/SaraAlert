class AddSevereToAssessments < ActiveRecord::Migration[6.0]
  def change
    add_column :assessments, :severe, :boolean
  end
end
