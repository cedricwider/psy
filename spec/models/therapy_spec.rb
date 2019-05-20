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

    describe 'Sessions' do
      context 'Read/Write access' do
        let(:therapy) { create(:therapy) }
        let(:session_attributes) { attributes_for(:session, :without_therapy) }

        before(:each) do
          therapy.sessions.create(session_attributes)
        end

        it 'holds on to its sessions' do
          expect(therapy.sessions.first.title).to eq session_attributes[:title]
        end
      end
      context 'Destroy' do
        let(:therapy) { create(:therapy) }
        let!(:session) do
          therapy.sessions.create(attributes_for(:session, :without_therapy))
        end

        it 'destroys its sessions when it is destroyed' do
          expect(therapy.sessions.count).to be 1
          therapy.destroy
          expect(Session.where(id: session.id).count).to be 0
        end
      end
    end
  end
end
