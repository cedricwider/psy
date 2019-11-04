require 'rails_helper'

describe Invoice do
  describe 'scope' do
    describe 'having_status' do
      before do
        create(:invoice, status: 'open')
        create(:invoice, status: 'overdue')
        create(:invoice, status: 'payed')
      end

      it 'finds invoices by status' do
        expect(Invoice.having_status('open').count).to eq 1
      end

      it 'finds invoices by multiple states' do
        expect(Invoice.having_status(%w[open overdue doener]).count).to eq 2
      end
    end
  end
end
