require 'rails_helper'

describe 'api/patients/show' do
  let(:patient) { create(:patient, :with_addresses) }

  before(:each) do
    assign(:patient, patient)
    render
  end

  it 'renders patients' do
    json = JSON.parse(rendered)

    expect(json['id']).to eq patient.id
    expect(json['salutation']).to eq patient.salutation
    expect(json['first_name']).to eq patient.first_name
    expect(json['last_name']).to eq patient.last_name
    expect(json['sex']).to eq patient.sex
    expect(json['addresses']).to be_a Array
  end
end
