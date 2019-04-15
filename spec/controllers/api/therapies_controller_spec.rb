require 'rails_helper'

RSpec.describe Api::TherapiesController, type: :controller do
  let(:user) { create(:user, therapies: create_list(:therapy, 3)) }
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
      get :show, params: { id: user.therapies.first.id }, format: :json

      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let(:therapy_params) { attributes_for(:therapy) }

    it 'returns http success' do
      post :create, params:   therapy_params, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Creates a new therapy' do
      expect { post :create, params: therapy_params, format: :json }
        .to change { user.therapies.count }
        .by(1)
    end

    context 'With nested address' do
      let(:therapy_params) do
        attributes_for(:therapy)
          .merge(addresses: [attributes_for(:address)])
      end

      it 'Adds another address' do
        expect { post :create, params: therapy_params, format: :json }
          .to change { Therapy.count }
          .by(1)
      end
    end

    context 'With faulty input data' do
      let(:therapy_params) { attributes_for(:therapy, title: nil) }

      it 'Returns unsuccessful status code' do
        post :create, params: therapy_params, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'Returns an error message' do
        post :create, params: therapy_params, format: :json
        json = JSON.parse(response.body)

        expect(json.dig('errors', 'title')).to be_present
      end
    end
  end

  describe 'PUT #update' do
    let(:therapy) { user.therapies.first }
    let(:therapy_params) { attributes_for(:therapy).merge(id: therapy.id) }

    it 'returns http success' do
      put :update, params: therapy_params, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Updates the therapy' do
      expect { put :update, params: therapy_params, format: :json }.to(change { therapy.reload.title })
    end

    it 'Updates patient references, too' do
      put_params = therapy_params.dup
      patients = create_list(:patient, 3)
      put_params[:patients] = patients
      expect { put :update, params: put_params, format: :json }.to(change { therapy.reload.patients })
    end
  end

  describe 'GET #destroy' do
    let(:therapy) { user.therapies.first }
    it 'returns http success' do
      delete :destroy, params: { id: therapy.id }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'deletes a therapy' do
      expect { delete :destroy, params: { id: therapy.id }, format: :json }.to change { user.therapies.count }.by(-1)
    end
  end
end
