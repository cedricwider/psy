require 'rails_helper'

RSpec.describe Billing, type: :model do
  describe 'initialization ' do
    let(:billing) { create(:billing) }

    it 'initialized propery ' do
      expect(billing.session).to be_present
    end
  end

  describe '#status' do
    let(:billing) { build(:billing, invoices: invoices) }

    context 'with two different states' do
      let(:invoices) { [build(:invoice, status: 'payed'), build(:invoice, status: invoice_status)] }

      context 'when all invoices are open' do
        let(:invoice_status) { :open }

        it 'reports status as "open"' do
          expect(billing.status).to eq :open
        end
      end

      context 'with an open invoice' do
        let(:invoice_status) { 'payed' }

        it 'reports status as "payed"' do
          expect(billing.status).to eq :payed
        end
      end
    end

    context 'with multiple different states' do
      let(:invoices) do
        [
          build(:invoice, status: 'payed'),
          build(:invoice, status: status_one),
          build(:invoice, status: status_two)
        ]
      end

      context 'one open and one overdue' do
        let(:status_one) { 'open' }
        let(:status_two) { 'overdue' }

        it 'reports status "overdue"' do
          expect(billing.status).to eq :overdue
        end
      end

      context 'one overdue and one reminder_overdue' do
        let(:status_one) { 'overdue' }
        let(:status_two) { 'reminder_overdue' }

        it 'reports status "overdue"' do
          expect(billing.status).to eq :reminder_overdue
        end
      end
    end
  end
end
