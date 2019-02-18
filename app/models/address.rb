class Address < ApplicationRecord
  validates_presence_of :street, :zip, :town, :country
  after_initialize :set_default_country

  belongs_to :patient

  def set_default_country
    self.country ||= 'Switzerland'
  end
end
