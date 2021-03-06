class Session < ApplicationRecord
  belongs_to :therapy
  validates_presence_of [:therapy, :duration_minutes]
  before_save do |session|
    session.price_cents ||= session.therapy.price_cents
  end
end
