class Invoice < ApplicationRecord
  belongs_to :billing
  scope :having_status, ->(*states) { where(status: states) }
end
