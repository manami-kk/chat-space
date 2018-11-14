Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: %i[edit update index]
  resources :groups, only: %i[index new create edit update] do
    resources :messages, only: %i[index create]
  end
end
