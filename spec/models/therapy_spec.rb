require 'rails_helper'

RSpec.describe Therapy, type: :model do
  subject { described_class.new(therapy_params) }

  describe 'Validations' do
    let(:user) { create(:user) }
    let(:therapy_params) { attributes_for(:therapy, user_id: user.id) }

    it 'is valid' do
      expect(subject).to be_valid
    end

    context 'title' do
      let(:therapy_params) { attributes_for(:therapy, user_id: user.id, title: nil) }

      it 'Requires the title to be set' do
        expect(subject).not_to be_valid
      end
    end
  end

  describe 'Relations' do
    describe 'User' do
      let(:user) { create(:user) }
      let(:therapy) { create(:therapy, user: user) }

      it 'holds on to its user' do
        expect(therapy.user).to eq user
      end
    end

    describe 'Patients' do
      let(:patient) { create(:patient) }
      let(:therapy) { create(:therapy, patients: [patient]) }

      it 'holds on to its patients' do
        expect(therapy.patients.first).to eq patient
      end
    end
  end
end
