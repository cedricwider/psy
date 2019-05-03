class AddActiveToTherapies < ActiveRecord::Migration[5.2]
  def change
    add_column :therapies, :active, :boolean, null: false, default: true
  end
end
