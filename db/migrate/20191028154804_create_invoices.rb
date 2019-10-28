class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.string :title
      t.datetime :bill_date
      t.datetime :pay_date
      t.string :status
      t.references :billing, foreign_key: true

      t.timestamps
    end
  end
end
