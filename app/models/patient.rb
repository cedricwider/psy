class Patient < ApplicationRecord
  validates_presence_of :first_name, :last_name

  belongs_to :user
  has_many :addresses

  accepts_nested_attributes_for :addresses
end
