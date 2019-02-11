require 'rails_helper'

describe User, type: :model do
  let(:user) { create(:user) }

  describe 'Validations' do
    it 'has a first_name' do
      user.first_name = nil
      expect(user).not_to be_valid
    end

    it 'has a last_name' do
      user.last_name = nil
      expect(user).not_to be_valid
    end

    it 'has a unique email' do
      another_user = user.dup
      expect(another_user).not_to be_valid
    end

    describe 'Password' do
      it 'has a password' do
        user.password = user.password_confirmation = nil
        expect(user).not_to be_valid
      end

      it 'has a minimum length of 8 characters' do
        user.password = user.password_confirmation = '1234567'
        expect(user).not_to be_valid
      end
    end
  end

  describe 'Save hooks' do
    it 'downcases email' do
      upcase_email = FFaker::Internet.email.upcase
      user = build(:user, email: upcase_email)

      user.save

      expect(user.email).to eq upcase_email.downcase
    end
  end
end
