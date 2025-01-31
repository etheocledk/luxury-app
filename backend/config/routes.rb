Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    confirmations: "users/confirmations",
    passwords: "users/passwords"
  }

  get "home", to: "home#index"
  get "search", to: "home#search"

  resources :places
  resources :listings
  resources :images, only: [ :create ]
end
