class AddPriceToTherapies < ActiveRecord::Migration[5.2]
  def change
    add_column :therapies, :price_cents, :integer, null: false, default: 180_00
  end
end
