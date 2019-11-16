Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  resource :tokens, only: [:create]
  resource :users, only: [:show, :create, :update, :destroy]

  namespace :api do
    resources :patients, only: [:index, :show, :create, :update, :destroy]
    resources :addresses, only: [:show, :create, :update, :destroy]
    resources :therapies, only: [:index, :show, :create, :update, :destroy]
    resources :sessions, only: [:index, :show, :create, :update, :destroy] do
      get '/billings' => 'billings#session_index'
      post '/billings/create' => 'billings#create'
    end
    resources :billings, only: [:index, :show, :update, :destroy]

    get 'billings/q', to: 'billings#query'
  end

  get '*unmatched_route', to: 'home#index'
end
