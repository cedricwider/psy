require 'rails_helper'

describe 'api/patients/index' do
  let(:patients) { create_list(:patient, 3) }

  before(:each) do
    assign(:patients, patients)
    render
  end

  it 'renders patients' do
    json = JSON.parse(rendered)

    expect(json).to be_a Array
    expect(json.size).to eq 3
  end
end
