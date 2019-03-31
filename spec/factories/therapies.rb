FactoryBot.define do
  factory :therapy do
    title { FFaker::Lorem.word }

    association :user, factory: :user

    trait :with_patients do
      after :create do |therapy|
        create_list :patient, 3, therapies: [therapy]
      end
    end
  end
end
