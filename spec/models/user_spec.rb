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
    before(:each) do
      user.save
    end

    context 'with upcase email' do
      let(:user) { build(:user, email: FFaker::Internet.email.upcase) }

      it 'downcases email' do
        expect(user.email).not_to match(/[A-Z]/)
      end

      it 'autogenerates tenant id' do
        expect(user.tenant).not_to be_blank
      end
    end
  end

  describe 'Associations' do
    describe 'Sessions' do
      let(:user) { create(:user) }
      let(:therapy) { create(:therapy, user: user) }
      let(:session) { create(:session, therapy: therapy) }

      it 'has access to sessions' do
        expect(user.sessions).to eq [session]
      end
    end
  end
end
