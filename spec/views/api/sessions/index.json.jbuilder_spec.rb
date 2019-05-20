require 'rails_helper'

describe 'api/sessions/index' do
  let(:sessions) { create_list(:session, 3) }

  before(:each) do
    assign(:sessions, sessions)
    render
  end

  it 'renders sessions' do
    json = JSON.parse(rendered)

    expect(json).to be_a Array
    expect(json.size).to eq 3
  end
end
