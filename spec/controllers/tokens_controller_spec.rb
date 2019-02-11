require 'rails_helper'

RSpec.describe TokensController, type: :controller do
  let(:user) { create(:user) }

  it 'allows one to log in with username and password' do
    post :create, params: {
      format: :json,
      username: user.email,
      password: user.password
    }
    expect(response).to be_successful
  end

  it 'returns an error message when authentication is not successful' do
    post :create, params: {
      format: :json,
      username: user.email,
      password: 'wrong_password'
    }

    expect(response.status).to eq 401
  end

  it 'returns a jwt when authentication is successful' do
    post :create, params: {
      format: :json,
      username: user.email,
      password: user.password
    }

    payload = JSON.parse(response.body)
    token = payload['token']
    expect(token).to be_present
  end

  describe 'Web token' do
    before do
      post :create, params: {
        format: :json,
        username: user.email,
        password: user.password
      }
    end

    let(:payload) do
      token = JSON.parse(response.body)&.dig('token')
      hmac_secret = Rails.configuration.x.hmac_key
      payload = JWT.decode token, hmac_secret, true, algorithm: 'HS256'
      payload.reduce(&:merge)
    end

    it 'contains a user id' do
      expect(payload['user_id']).to eq user.id
    end

    it 'contains a expiration date' do
      expect(payload['expiration_date']).to be_present
    end
  end
end
