FactoryBot.define do
  factory :patient do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    salutation { FFaker::Name.prefix }
    sex { 'female' }
    phone { FFaker::PhoneNumberCH.phone_number }

    association :user, factory: :user

    trait :with_addresses do
      after :create do |patient|
        create_list :address, 3, patient: patient
      end
    end
  end
end
