source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0.beta1'
gem 'sqlite3', '1.3.7'
gem 'faker', '1.1.2'
gem 'jquery-rails', '2.2.1'
gem 'turbolinks', '1.0.0'
gem 'jbuilder', '1.0.1'
gem 'bcrypt-ruby', '3.0.1'
gem 'will_paginate', '3.0.4'
gem 'bootstrap-will_paginate', '0.0.9'

gem 'devise',                    github: 'plataformatec/devise', branch: 'rails4'
gem 'simple_form'

group :development, :test do
  gem 'rspec-rails', '2.13.0'
  gem 'guard-rspec', '2.5.0'
  gem 'rack-livereload'

  gem 'spork-rails',      github: 'railstutorial/spork-rails'
  gem 'guard-spork',      github: 'guard/guard-spork'
  gem 'guard-cucumber',   github: 'guard/guard-cucumber'
  gem 'guard-bundler',    github: 'guard/guard-bundler'
  gem 'guard-rails',      github: 'ranmocy/guard-rails'
  gem 'guard-livereload', github: 'guard/guard-livereload'
  gem 'cucumber-rails',   github: 'cucumber/cucumber-rails', branch:'master_rails4_test', require: false
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'meta_request',     github: 'dejan/rails_panel' #https://chrome.google.com/webstore/detail/railspanel/gjpfobpafnhjhbajcjgccbbdofdckggg 
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
  gem 'fuubar'
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

