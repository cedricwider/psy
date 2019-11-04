require 'rails_helper'

describe 'api/billings/index' do
  let(:billings) { create_list(:billing, 3) }

  before(:each) do
    assign(:billings, billings)
    render
  end

  it 'renders billings' do
    json = JSON.parse(rendered)

    expect(json).to be_a Array
    expect(json.size).to eq 3
  end
end
