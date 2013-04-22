source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0.beta1'
gem 'sqlite3', '1.3.7'

group :development, :test do
  gem 'rspec-rails', '2.13.0'
  gem 'guard-rspec', '2.5.0'

  gem 'spork-rails', github: 'railstutorial/spork-rails'
  gem 'guard-spork', '1.5.0'
  gem 'guard-cucumber'
  gem 'guard-bundler'
  gem 'guard-rails'
  gem 'better_errors'
end

group :assets do
  gem 'sass-rails',   '4.0.0.beta1'
  gem 'coffee-rails', '4.0.0.beta1'
  gem 'bootstrap-sass', '2.3.0.1'
  gem 'uglifier', '1.0.3'
  gem 'therubyracer'
end

group :test do
  gem 'selenium-webdriver', '2.0'
  gem 'capybara', '2.1.0.beta1'
  gem 'factory_girl_rails', '4.2.0'

  gem 'cucumber-rails', '1.3.0', require: false
  gem 'database_cleaner', github: 'bmabey/database_cleaner'

  case RUBY_PLATFORM
    when /mswin|windows/i
      gem 'rb-fchange', '0.0.6'
      gem 'rb-notifu', '0.0.4'
      gem 'win32console', '1.3.2'

    when /linux|arch/i
      gem 'rb-inotify', '0.9.0'
      gem 'libnotify', '0.8.0'
      
    when /darwin/i
      gem 'rb-fsevent', '0.9.3', :require => false
      gem 'growl', '1.0.3'
    when /sunos|solaris/i  
    else
      
  end
end   

gem 'jquery-rails', '2.2.1'
gem 'turbolinks', '1.0.0'
gem 'jbuilder', '1.0.1'
gem 'bcrypt-ruby', '3.0.1'
