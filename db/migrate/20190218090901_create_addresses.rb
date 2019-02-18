class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :street
      t.string :house_number
      t.integer :zip
      t.string :town
      t.string :country
      t.boolean :main_address, null: false, default: false

      t.timestamps
    end
  end
end
