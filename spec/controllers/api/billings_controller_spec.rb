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

  describe '#query' do
    describe 'find_by_status' do
      render_views

      let(:billing) { create(:billing) }

      before(:each) do
        create_list(:invoice, 5, billing: billing, status: %w[payed open reminded overdue].sample)
        create(:invoice, status: 'reminder_overdue', billing: billing)
      end

      it 'finds open billings' do
        get :query, params: { state: 'reminder_overdue' }, format: :json

        result = JSON.parse(response.body)
        expect(result.size).to eq 1
      end
    end
  end

  describe 'nested routes (index and create)' do
    describe '#create' do
      let(:session) { create(:session) }
      let(:billing_attributes) { attributes_for(:billing) }

      it 'redirects on success' do
        post :create, format: :json, params: { session_id: session.id }, body: billing_attributes.to_json

        expect(response.status).to eq 302
      end

      it 'creates a new billing' do
        expect do
          post :create, format: :json, params: { session_id: session.id }, body: billing_attributes.to_json
        end.to(change { Billing.count }.by(1))
      end
    end

    describe '#index' do
      render_views
      let(:my_billing) { build(:billing) }
      let(:other_billing) { build(:billing) }
      let(:my_session) { create(:session, billings: [my_billing]) }
      let!(:other_session) { create(:session, billings: [other_billing]) }

      it 'responds with success' do
        get :index, params: { session_id: my_session.id }, format: :json

        expect(response).to be_successful
      end

      it 'returns only billings from my session' do
        get :index, params: { session_id: my_session.id }, format: :json

        billings = JSON.parse(response.body)
        expect(billings.size).to eq 1
        expect(billings.first['id']).to eq my_billing.id
      end
    end
  end

  describe '#update' do
    let(:billing) { create(:billing) }
    let(:billing_values) { attributes_for(:billing) }

    it 'updates the billing' do
      put :update, params: { id: billing.id }, format: :json, body: billing_values.to_json

      expect(billing.reload.title).to eq billing_values[:title]
    end
  end
end
