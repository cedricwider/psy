class Therapy < ApplicationRecord
  validates_presence_of :title
  has_and_belongs_to_many :patients
  belongs_to :user
end
