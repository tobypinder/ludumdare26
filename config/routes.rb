FirstApp::Application.routes.draw do
  
  devise_for :users
  resources :game,      only: [:index]
  #resource  :position,  only: [:show], as: :current_position
  #REST be damned!
  get '/api/current_position',  to: 'position#show',        as: :current_position
  get '/api/world',             to: 'world#show',           as: :world
  get '/api/move/left',         to: 'position#move_left',   as: :move_left
  get '/api/move/up',           to: 'position#move_up',     as: :move_up
  get '/api/move/right',        to: 'position#move_right',  as: :move_right
  get '/api/move/down',         to: 'position#move_down',   as: :move_down
  get '/api/move/rest',         to: 'position#move_rest',   as: :move_rest
  get '/api/player/info',       to: 'game#player_info',     as: :player_info

   
  get '/misc/dying', to: 'misc#dying'
  post '/misc/dying', to: 'misc#dying'
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
