class AddPatientRefToAddress < ActiveRecord::Migration[5.2]
  def change
    add_reference :addresses, :patient, foreign_key: true
  end
end
