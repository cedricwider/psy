class AddActiveToPatients < ActiveRecord::Migration[5.2]
  def change
    add_column :patients, :active, :boolean, null: false, default: true
  end
end
