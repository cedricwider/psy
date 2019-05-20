class Session < ApplicationRecord
  belongs_to :therapy
  validates_presence_of [:therapy, :price_cents, :duration_minutes]
end
