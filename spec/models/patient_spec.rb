require 'rails_helper'

RSpec.describe Patient, type: :model do
  describe 'Validations' do
    subject { described_class.new(patient_values) }

    context 'With no missing values' do
      let(:patient_values) { attributes_for(:patient) }

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
end
