class CreateTherapies < ActiveRecord::Migration[5.2]
  def change
    create_table :therapies do |t|
      t.string :title
      t.active :boolean

      t.timestamps
    end

    add_reference :therapies, :user, foreign_key: true
  end
end
