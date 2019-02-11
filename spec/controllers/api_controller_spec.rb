require 'rails_helper'

describe ApiController do
  controller ApiController do
    def index
      render json: { success: true }
    end
  end

  describe 'User Authentication' do
    let(:user) { create(:user) }
    let(:expiration_date) { Time.now + 3.days }
    let(:payload) { { user_id: user.id, expiration_date: expiration_date } }
    let(:token_key) { Rails.configuration.x.hmac_key }
    let(:token) { JWT.encode payload, token_key, 'HS256' }

    before do
      @request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}"
      get :index
    end

    context 'Successful authentication' do
      it 'Authenticates with JWT' do
        expect(response).to be_successful
      end
    end

    context 'Expired token' do
      let(:expiration_date) { Time.now - 3.minutes }

      it 'does not authenticate' do
        expect(response).not_to be_successful
      end

      it 'returns a json response with error description' do
        error = JSON.parse(response.body)
        expect(error['error']).to eq 'Unauthorized'
        expect(error['message']).to be_present
      end
    end

    context 'Ivalid key signature' do
      let(:token_key) { 'Maliciously Wrong Key' }

      it 'does not authenticate' do
        expect(response).not_to be_successful
      end
    end
  end
end
