class Billing < ApplicationRecord
  belongs_to :session
  has_many :invoices

  def self.find_by_status(requested_status)
    Invoice
      .includes(:billing)
      .having_status(requested_status)
      .map(&:billing)
      .uniq(&:id)
      .filter { |billing| billing.status == requested_status.to_sym }
  end

  def status
    invoice_states = invoices.map(&:status)
    %w[reminder_overdue reminded overdue open].each do |state|
      return state.to_sym if invoice_states.any?(state)
    end
    :payed
  end
end
