class AddUserRefToPatients < ActiveRecord::Migration[5.2]
  def change
    add_reference :patients, :user, foreign_key: true
  end
end
