FactoryBot.define do
  factory :invoice do
    title { FFaker::Lorem.word }
    bill_date { '2019-10-28 16:48:04' }
    pay_date { '2019-10-28 16:48:04' }
    status { [:open, :payed, :overdue, :reminded, :reminder_overdue].sample }

    association :billing, factory: :billing
  end
end
