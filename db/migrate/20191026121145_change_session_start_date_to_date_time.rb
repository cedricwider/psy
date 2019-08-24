class ChangeSessionStartDateToDateTime < ActiveRecord::Migration[5.2]
  def up
    remove_column :sessions, :start_time
    add_column :sessions, :start_time, :datetime
  end

  def down
    remove_column :sessions, :start_time
    add_column :sessions, :start_time, :time
  end
end
