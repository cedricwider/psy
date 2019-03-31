class CreateTherapiesPatientsJoinTable < ActiveRecord::Migration[5.2]
  def change
    create_join_table :therapies, :patients do |t|
      t.index :therapy_id
      t.index :patient_id
    end
  end
end
