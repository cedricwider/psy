require 'rails_helper'

RSpec.describe Session, type: :model do
  subject { described_class.new(session_params) }
  let(:therapy) { create(:therapy) }

  describe 'Validations' do
    let(:session_params) { attributes_for(:session, therapy_id: therapy.id) }

    it 'is valid' do
      expect(subject).to be_valid
    end

    context 'duration_minutes' do
      let(:session_params) { attributes_for(:session, therapy_id: therapy.id).merge(duration_minutes: nil) }

      it 'Requires the title to be set' do
        expect(subject).not_to be_valid
      end
    end

    context 'therapy_id' do
      let(:session_params) { attributes_for(:session, therapy_id: therapy.id).merge(therapy_id: nil) }

      it 'Requires the title to be set' do
        expect(subject).not_to be_valid
      end
    end
  end

  describe 'Default values' do
    let(:session) { Session.create(session_params) }

    describe 'price_cents' do
      context 'When the price is not set on the session' do
        let(:session_params) { attributes_for(:session, therapy_id: therapy.id).merge(price_cents: nil) }

        it 'is derived from the therapy' do
          expect(session.price_cents).to eq therapy.price_cents
        end

        it 'is independent from changes after the session has been created' do
          session # touch session in order to have it created
          therapy.update(price_cents: 160_00)
          expect(session.reload.price_cents).not_to eq therapy.price_cents
        end
      end

      context 'When the price is set on the session' do
        let(:session_params) { attributes_for(:session, therapy_id: therapy.id).merge(price_cents: session_price_cents) }
        let(:session_price_cents) { 140_00 }

        it 'returns its own price' do
          expect(session.price_cents).to eq session_price_cents
        end
      end
    end
  end
end
