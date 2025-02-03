Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations",
    confirmations: "users/confirmations",
    passwords: "users/passwords"
  }

  get "home", to: "home#index"
  get "search", to: "home#search"
  get "geo_regions", to: "home#geo_regions"
  get "place_types", to: "home#place_types"

  post "images", to: "images#create"

  resources :places
  resources :listings
  resources :images, only: [ :create ]
end
