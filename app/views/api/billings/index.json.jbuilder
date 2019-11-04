# frozen_string_literal: true

json.array! @billings, partial: 'api/billings/billing', as: :billing
