require 'rails_helper'

describe 'api/addresses/show' do
  let(:address) { create(:address) }

  before(:each) do
    assign(:address, address)
    render
  end

  it 'renders addresses' do
    json = JSON.parse(rendered)

    expect(json['id']).to eq address.id
    expect(json['street']).to eq address.street
    expect(json['house_number']).to eq address.house_number
    expect(json['zip']).to eq address.zip
    expect(json['town']).to eq address.town
    expect(json['country']).to eq address.country
    expect(json['main_address']).to eq address.main_address
  end
end
