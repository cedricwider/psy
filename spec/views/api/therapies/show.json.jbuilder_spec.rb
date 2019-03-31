require 'rails_helper'

describe 'api/therapies/show' do
  let(:therapy) { create(:therapy) }

  before(:each) do
    assign(:therapy, therapy)
    render
  end

  it 'renders therapies' do
    json = JSON.parse(rendered)

    expect(json['id']).to eq therapy.id
    expect(json['title']).to eq therapy.title
  end

  context 'With patient' do
    let(:patient) { create(:patient) }
    let(:therapy) { create(:therapy, patients: [patient]) }

    it 'includes patient information' do
      json = JSON.parse(rendered)

      response_patient = json['patients'].first
      expect(response_patient).to be_present
      expect(response_patient['id']).to eq patient.id
      expect(response_patient['href']).to be_present
    end
  end
end
