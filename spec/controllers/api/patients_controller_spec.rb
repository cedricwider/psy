require 'rails_helper'

RSpec.describe Api::PatientsController, type: :controller do
  let(:user) { create(:user, patients: create_list(:patient, 3)) }
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
      get :show, params: { id: user.patients.first.id }, format: :json

      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    let(:patient_params) { attributes_for(:patient) }

    it 'returns http success' do
      post :create, params: { patient: patient_params }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Creates a new patient' do
      expect { post :create, params: { patient: patient_params }, format: :json }
        .to change { user.patients.count }
        .by(1)
    end

    context 'With nested address' do
      let(:patient_params) do
        attributes_for(:patient)
          .merge(addresses: [attributes_for(:address)])
      end

      it 'Adds another address' do
        expect { post :create, params: { patient: patient_params }, format: :json }
          .to change { Address.count }
          .by(1)
      end
    end

    context 'With faulty input data' do
      let(:patient_params) do
        attributes = attributes_for(:patient)
        attributes.delete(:first_name)
        attributes
      end

      it 'Returns unsuccessful status code' do
        post :create, params: { patient: patient_params }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'Returns an error message' do
        post :create, params: { patient: patient_params }, format: :json
        json = JSON.parse(response.body)

        expect(json.dig('errors', 'first_name')).to be_present
      end
    end
  end

  describe 'PUT #update' do
    let(:patient_params) { attributes_for(:patient) }
    let(:patient) { user.patients.first }

    it 'returns http success' do
      put :update, params: { id: patient.id, patient: patient_params }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'Updates the patient' do
      expect { put :update, params: { id: patient.id, patient: patient_params }, format: :json }.to change { patient.reload.first_name }
    end
  end

  describe 'GET #destroy' do
    let(:patient) { user.patients.first }
    it 'returns http success' do
      delete :destroy, params: { id: patient.id }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'deletes a patient' do
      expect { delete :destroy, params: { id: patient.id }, format: :json }.to change { user.patients.count }.by(-1)
    end
  end
end
