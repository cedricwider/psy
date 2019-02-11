class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_uniqueness_of :email
  validates :password, length: { minimum: 8 }

  has_secure_password
end
