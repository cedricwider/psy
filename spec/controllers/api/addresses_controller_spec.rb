require 'rails_helper'

RSpec.describe Api::AddressesController, type: :controller do
  let(:user) { create(:user, patients: create_list(:patient, 3)) }
  let(:payload) { { user_id: user.id, expiration_date: Time.now + 3.days } }
  let(:token) { JWT.encode payload, Rails.configuration.x.hmac_key, 'HS256' }
  let(:patient) { create(:patient) }

  before do
    @request.env['HTTP_AUTHORIZATION'] = "Token token=#{token}"
  end

  describe 'GET #show' do
    let(:address) { create(:address) }
    it 'returns http success' do
      get :show, params: { id: address.id }, format: :json

      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let(:address_params) { attributes_for(:address).merge(patient_id: patient.id) }

    it 'returns http success' do
      post :create, params: { address: address_params }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Creates a new address' do
      expect { post :create, params: { address: address_params }, format: :json }
        .to change { Address.count }
        .by(1)
    end

    context 'With faulty input data' do
      let(:address_params) do
        attributes = attributes_for(:address)
        attributes.delete(:town)
        attributes
      end

      it 'Returns unsuccessful status code' do
        post :create, params: { address: address_params }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'Returns an error message' do
        post :create, params: { address: address_params }, format: :json
        json = JSON.parse(response.body)

        expect(json.dig('errors', 'town')).to be_present
      end
    end
  end

  describe 'PUT #update' do
    let(:address_params) { attributes_for(:address).merge(patient_id: patient.id) }
    let(:address) { create(:address) }

    it 'returns http success' do
      put :update, params: { id: address.id, address: address_params }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Updates the address' do
      expect { put :update, params: { id: address.id, address: address_params }, format: :json }.to change { address.reload.town }
    end
  end

  describe 'GET #destroy' do
    let!(:address) { create(:address) }
    it 'returns http success' do
      delete :destroy, params: { id: address.id }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'deletes a address' do
      expect { delete :destroy, params: { id: address.id }, format: :json }.to change { Address.count }.by(-1)
    end
  end
end
