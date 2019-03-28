require 'rails_helper'

RSpec.describe Therapy, type: :model do
  subject { described_class.new(therapy_params) }

  let(:therapy_params) { attributes_for(:therapy) }

  it 'is valid' do
    expect(subject).to be_valid
  end

  describe 'Validations' do
    context 'title' do
      let(:therapy_params) { attributes_for(:therapy, title: nil) }

      it 'Requires the title to be set' do
        expect(subject).not_to be_valid
      end
    end
  end
end
