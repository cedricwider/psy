require 'rails_helper'

RSpec.describe Patient, type: :model do
  subject { described_class.new(patient_values) }

  let(:patient_values) { attributes_for(:patient).merge(user: user) }
  let(:user) { create(:user) }

  describe 'Validations' do
    context 'With no missing values' do
      it 'is valid' do
        expect(subject).to be_valid
      end
    end

    context 'With missing first_name' do
      let(:patient_values) do
        patient_values = attributes_for(:patient)
        patient_values.delete(:first_name)
        patient_values
      end

      it 'Validates presence of first_name' do
        expect(subject).not_to be_valid
      end
    end

    context 'With missing last_name' do
      let(:patient_values) do
        patient_values = attributes_for(:patient)
        patient_values.delete(:last_name)
        patient_values
      end

      it 'Validates presence of last_name' do
        expect(subject).not_to be_valid
      end
    end
  end

  describe 'Relations' do
    describe 'User' do
      it 'belongs to a user' do
        expect(subject.user).to be_present
      end
    end

    describe 'Address' do
      let(:patient) { create(:patient, :with_addresses) }

      it 'has addresses' do
        expect(patient.addresses).to be_present
        expect(patient.addresses).not_to be_empty
      end
    end

    describe 'Therapies' do
      let(:therapy) { create(:therapy) }
      let(:patient) { create(:patient, therapies: [therapy]) }

      it 'holds on to its therapies' do
        expect(patient.therapies.first).to eq therapy
      end
    end
  end
end
