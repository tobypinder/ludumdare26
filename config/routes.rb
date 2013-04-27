FirstApp::Application.routes.draw do
  
  devise_for :users
  resources :game,      only: [:index]
  #resource  :position,  only: [:show], as: :current_position
  get '/api/current_position', to: 'position#show', as: :current_position
#  resources :users do
#    member do
#      get :following, :followers
#    end
#  end  
#  resources :sessions,      only: [:new, :create, :destroy]
#  resources :microposts,    only: [:create, :destroy]
#  resources :relationships, only: [:create, :destroy]
#  
#  root to: 'static_pages#home'
#  match '/signup',  to: 'users#new',            via: 'get'
#  match '/help',    to: 'static_pages#help',    via: 'get'
#  match '/about',   to: 'static_pages#about',   via: 'get'
#  match '/contact', to: 'static_pages#contact', via: 'get'
#  match '/signup',  to: 'users#new',            via: 'get'
#  match '/signin',  to: 'sessions#new',         via: 'get'
#  match '/signout', to: 'sessions#destroy',     via: 'delete'  
	root to: "home#index"
end
