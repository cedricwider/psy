class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_uniqueness_of :email
  validates :password, length: { minimum: 8 }

  has_secure_password

  has_many :patients, dependent: :destroy
  has_many :therapies, dependent: :destroy
  has_many :sessions, through: :therapies

  before_create do
    self.tenant ||= SecureRandom.uuid
  end
end
