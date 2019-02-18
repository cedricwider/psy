require 'rails_helper'

RSpec.describe Address, type: :model do
  subject { described_class.new(address_values.merge(patient: patient)) }

  let(:patient) { create(:patient) }
  let(:address_values) { attributes_for(:address) }

  describe 'Validations' do
    context 'Valid address values' do
      it 'is valid' do
        expect(subject).to be_valid
      end
    end

    context 'Missing street' do
      let(:address_values) do
        values = attributes_for(:address)
        values.delete(:street)
        values
      end

      it 'is invalid' do
        expect(subject).not_to be_valid
      end
    end

    context 'Missing zip' do
      let(:address_values) do
        values = attributes_for(:address)
        values.delete(:zip)
        values
      end

      it 'is invalid' do
        expect(subject).not_to be_valid
      end
    end

    context 'Missing town' do
      let(:address_values) do
        values = attributes_for(:address)
        values.delete(:town)
        values
      end

      it 'is invalid' do
        expect(subject).not_to be_valid
      end
    end
  end

  describe 'Default values' do
    let(:address_values) do
      values = attributes_for(:address)
      values.delete(:country)
      values
    end

    it 'Sets default value for country' do
      expect(subject.country).to be_present
    end

    it 'is still valid' do
      expect(subject).to be_valid
    end
  end

  describe 'Relations' do
    describe 'Patient' do
      it 'belongs to a patient' do
        expect(subject.patient).to be_present
      end
    end
  end
end
