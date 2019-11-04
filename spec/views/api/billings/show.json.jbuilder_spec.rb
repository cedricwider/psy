require 'rails_helper'

describe 'api/billings/show' do
  let(:billing) { create(:billing) }

  before(:each) do
    assign(:billing, billing)
    render
  end

  it 'renders billings' do
    json = JSON.parse(rendered)

    expect(json['id']).to eq billing.id
    expect(json['title']).to eq billing.title
    expect(json['status']).to eq billing.status.to_s
    expect(json.dig('session', 'id')).to eq billing.session.id
  end
end
