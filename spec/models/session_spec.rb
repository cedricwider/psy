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

    context 'price_cents' do
      let(:session_params) { attributes_for(:session, therapy_id: therapy.id).merge(price_cents: nil) }

      it 'Requires the title to be set' do
        expect(subject).not_to be_valid
      end
    end
  end
end
