Rails.application.routes.draw do
  root to: 'home#index'
  get 'home/index'

  get '*unmatched_route', to: 'home#index'

  resource :tokens, only: [:create]
  resource :users, only: [:show, :create, :update, :delete]
end
