FactoryBot.define do
  factory :message do
    text Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/image.jpg")
    user
    group
  end
end