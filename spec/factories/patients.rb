FactoryBot.define do
  factory :patient do
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
    salutation { FFaker::Name.prefix }
    sex { 'female' }
  end
end
