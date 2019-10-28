class Billing < ApplicationRecord
  belongs_to :session
  has_many :invoices

  def status
    invoice_states = invoices.map(&:status)
    %w[reminder_overdue reminded overdue open].each do |state|
      return state.to_sym if invoice_states.any?(state)
    end
    :payed
  end
end
