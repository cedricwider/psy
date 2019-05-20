class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.string :title
      t.time :start_time
      t.integer :duration_minutes, nil: false, default: 0
      t.integer :price_cents, nil: false, default: 0
      t.references :therapy, foreign_key: true, nil: false

      t.timestamps
    end
  end
end
