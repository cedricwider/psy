class Therapy < ApplicationRecord
  validates_presence_of :title, :price_cents
  has_and_belongs_to_many :patients
  belongs_to :user
  has_many :sessions, dependent: :destroy
end
