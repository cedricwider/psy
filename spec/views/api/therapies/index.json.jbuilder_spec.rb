require 'rails_helper'

describe 'api/therapies/index' do
  let(:therapies) { create_list(:therapy, 3) }

  before(:each) do
    assign(:therapies, therapies)
    render
  end

  it 'renders therapies' do
    json = JSON.parse(rendered)

    expect(json).to be_a Array
    expect(json.size).to eq 3
  end
end
