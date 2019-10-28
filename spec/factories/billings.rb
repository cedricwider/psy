FactoryBot.define do
  factory :billing do
    title { FFaker::Lorem.word }

    association :session, factory: :session
  end
end
