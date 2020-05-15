FactoryBot.define do

  factory :user do
    sequence :email do |n|
      "dummyEmail#{n}@gmail.com"
    end
    sequence :username do |n|
      "dummy_user_name#{n}"
    end
    password { "secretPassword" }
    password_confirmation { "secretPassword" }
  end

  factory :game do
    attackers_turn { true }
    association :user
  end

  factory :piece do
    y_coord { 0 }
    x_coord { 0 }
    association :game
  end

end
