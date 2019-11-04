require 'rails_helper'

describe Api::BillingsController do
  let(:user) { create(:user) }
  let(:payload) { { user_id: user.id, expiration_date: Time.now + 3.days } }
  let(:token) { JWT.encode payload, Rails.configuration.x.hmac_key, 'HS256' }

  before do
    @request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}"
  end

  describe '#index' do
    it 'responds with success' do
      get :index, params: {}, format: :json

      expect(response).to be_successful
    end
  end

  describe '#show' do
    let(:billing) { create(:billing) }

    it 'responds with success' do
      get :show, params: { id: billing.id }, format: :json

      expect(response).to be_successful
    end

    context 'when billing can not be found' do
      let(:wrong_billing_id) { 'not a number' }

      it 'responds with 404' do
        get :show, params: { id: wrong_billing_id }, format: :json

        expect(response.status).to be 404
      end
    end
  end
end
