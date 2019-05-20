FactoryBot.define do
  factory :session do
    title { FFaker::Lorem.word }
    start_time { Time.now }
    duration_minutes { 1 }
    price_cents { 1 }

    association :therapy, factory: :therapy

    trait :without_therapy do
      therapy { nil }
    end
  end
end
