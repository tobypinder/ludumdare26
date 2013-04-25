namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    make_users
    make_microposts
    make_relationships
    puts "\n[Done]"
  end
end

def make_users
  admin = User.create!(name:     "Toby Pinder",
                       email:    "gigitrix@gmail.com",
                       password: "password",
                       password_confirmation: "password",
                       admin: true)
  print '.'
  99.times do |n|
    name  = Faker::Name.name
    email = "example-#{n+1}@railstutorial.org"
    password  = "password"
    User.create!(name:     name,
                 email:    email,
                 password: password,
                 password_confirmation: password)
    print '.'
  end
end

def make_microposts
  users = User.all(limit: 6)
  50.times do
    content = Faker::Lorem.sentence(5)
    users.each { |user| user.microposts.create!(content: content); print '.' }
  end
end

def make_relationships
  users = User.all
  user  = users.first
  followed_users = users[2..50]
  followers      = users[3..40]
  followed_users.each { |followed| user.follow!(followed); print '.' }
  followers.each      { |follower| follower.follow!(user); print '.' }
end

