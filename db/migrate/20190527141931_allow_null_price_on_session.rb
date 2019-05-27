class AllowNullPriceOnSession < ActiveRecord::Migration[5.2]
  def change
    change_column_null :sessions, :price_cents, true
    change_column_default :sessions, :price_cents, from: 0, to: nil
  end
end
