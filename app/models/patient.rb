class Patient < ApplicationRecord
  validates_presence_of :first_name, :last_name

  belongs_to :user
  has_many :addresses
  has_and_belongs_to_many :therapies

  accepts_nested_attributes_for :addresses
end
