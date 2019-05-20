require 'rails_helper'

describe 'api/sessions/show' do
  let(:therapy) { create(:therapy) }
  let(:session) { create(:session, therapy: therapy) }

  before(:each) do
    assign(:session, session)
    render
  end

  it 'renders sessions' do
    json = JSON.parse(rendered)

    expect(json['id']).to eq session.id
    expect(json['title']).to eq session.title
    expect(json['duration_minutes']).to eq session.duration_minutes
    expect(json['price_cents']).to eq session.price_cents
    expect(json.dig('therapy', 'href')).to eq api_therapy_url(therapy, format: :json)
  end
end
