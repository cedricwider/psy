require 'rails_helper'

RSpec.describe Api::SessionsController, type: :controller do
  let(:user) { create(:user) }
  let!(:therapies) { create_list(:therapy, 3, user: user, sessions: create_list(:session, 3)) }
  let(:payload) { { user_id: user.id, expiration_date: Time.now + 3.days } }
  let(:token) { JWT.encode payload, Rails.configuration.x.hmac_key, 'HS256' }

  before do
    @request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}"
  end

  describe 'GET #index' do
    it 'returns http success' do
      get :index, format: :json

      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    it 'returns http success' do
      get :show, params: { id: user.sessions.first.id }, format: :json

      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let(:session_params) do
      attributes_for(:session, start_time: '2019-10-26T11:49:06.951Z').merge(
        therapy_id: therapies.first.id
      )
    end

    it 'returns http success' do
      post :create, params: session_params, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Creates a new session' do
      expect { post :create, params: session_params, format: :json }
        .to change { user.sessions.count }
        .by(1)
    end

    it 'Creates a session with correct values' do
      post :create, params: session_params, format: :json
      session = Session.last

      expect(session.price_cents).to be_present
      expect(session.start_time.to_s).to eq '2019-10-26 11:49:06 UTC'
      expect(session.therapy).to be_present
      expect(session.title).to be_present
    end

    context 'With faulty input data' do
      let(:session_params) do
        attributes = attributes_for(:session)
        attributes
      end

      it 'Returns unsuccessful status code' do
        expect { post :create, params: session_params, format: :json }.to raise_error(ActionController::ParameterMissing)
      end
    end
  end

  describe 'PUT #update' do
    let(:session) { user.sessions.first }
    let(:session_params) { attributes_for(:session).merge(id: session.id).merge(therapy_id: therapies.first.id) }

    it 'returns http success' do
      put :update, params: session_params, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Updates the session' do
      expect { put :update, params: session_params, format: :json }.to(change { session.reload.therapy_id })
    end
  end

  describe 'DELETE #destroy' do
    let(:session) { user.sessions.first }

    it 'returns http success' do
      delete :destroy, params: { id: session.id }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'deletes a session' do
      expect { delete :destroy, params: { id: session.id }, format: :json }.to(change { user.sessions.count })
    end
  end
end
