require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe '::create' do
    subject { post :create, params: user_params, format: :json }

    let(:password) { FFaker::Internet.password }
    let(:user) { build(:user, password: password, password_confirmation: password) }

    let(:user_params) do
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        password: password,
        password_confirmation: password
      }
    end

    it 'returns success' do
      expect(response).to be_successful
    end

    it 'creates a user' do
      expect { subject }.to change { User.count }.by 1
    end

    context 'Invalid user parameters' do
      let(:user_params) do
        {
          email: FFaker::Internet.email,
          first_name: nil,
          last_name: FFaker::Name.last_name,
          password: 'sw0rdf1sh',
          password_confirmation: password
        }
      end

      it 'is not successful' do
        subject
        expect(response).to_not be_successful
      end

      it 'returns e meaningful error response' do
        subject
        error_response = JSON.parse(response.body)
        expect(error_response['errors']).to be_present
        expect(error_response['message']).to eq 'Invalid Request'
        expect(error_response.dig('errors', 'first_name')).to be_present
        expect(error_response.dig('errors', 'password_confirmation')).to be_present
      end
    end

    context 'Already existing user' do
      let(:user) { create(:user, password: password, password_confirmation: password) }

      it 'returns correct error status' do
        subject
        expect(response.status).to eq 400
      end
    end
  end
end
