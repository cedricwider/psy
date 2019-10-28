class CreateBillings < ActiveRecord::Migration[5.2]
  def change
    create_table :billings do |t|
      t.string :title
      t.references :session, foreign_key: true

      t.timestamps
    end
  end
end
