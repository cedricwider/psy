FactoryBot.define do
  factory :address do
    street { FFaker::AddressCH.street_name }
    house_number { FFaker::AddressCH.building_number }
    zip { FFaker::AddressCH.postal_code }
    town { FFaker::AddressCH.city }
    country { FFaker::AddressCH.country }

    association :patient, factory: :patient
  end
end
