Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  resource :tokens, only: [:create]
  resource :users, only: [:show, :create, :update, :destroy]

  namespace :api do
    resources :patients, only: [:index, :show, :create, :update, :destroy]
    resources :addresses, only: [:show, :create, :update, :destroy]
    resources :therapies, only: [:index, :show, :create, :update, :destroy]
    resources :sessions, only: [:index, :show, :create, :update, :destroy]
    resources :billings, only: [:index, :show, :create, :update, :destroy]
  end

  get '*unmatched_route', to: 'home#index'
end
