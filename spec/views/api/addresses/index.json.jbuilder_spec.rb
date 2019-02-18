require 'rails_helper'

describe 'api/addresses/index' do
  let(:addresses) { create_list(:address, 3) }

  before(:each) do
    assign(:addresses, addresses)
    render
  end

  it 'renders addresses' do
    json = JSON.parse(rendered)

    expect(json).to be_a Array
    expect(json.size).to eq 3
  end
end
