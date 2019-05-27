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

    describe 'Storing values' do
      let(:title) { 'Rspec Therapy' }
      let(:active) { false }
      let(:price_cents) { 1337 }
      let(:therapy_params) { { title: title, active: active, price_cents: price_cents } }
      let(:therapy) { user.therapies.order(:created_at).last }

      before do
        post :create, params: therapy_params, format: :json
      end

      it 'Stores correct values' do
        expect(therapy.title).to eq title
        expect(therapy.active).to eq active
        expect(therapy.price_cents).to eq price_cents
      end
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

  describe 'DELETE #destroy' do
    let(:therapy) { user.therapies.first }
    it 'returns http success' do
      delete :destroy, params: { id: therapy.id }, format: :json

      expect(response).to have_http_status(:success)
    end

    it 'does not physically delete a therapy' do
      expect do
        delete :destroy, params: { id: therapy.id }, format: :json
      end.not_to(change { user.therapies.count })
    end

    it 'sets the therapies active flag to false' do
      expect(therapy.active).to be true
      expect do
        delete :destroy, params: { id: therapy.id }, format: :json
      end.to(change { therapy.reload.active })
    end
  end
end
