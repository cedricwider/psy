FactoryBot.define do
  factory :user do
    email { FFaker::Internet.email }
    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }

    pwd = FFaker::Internet.password
    password { pwd }
    password_confirmation { pwd }
  end
end
