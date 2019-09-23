Rails.application.routes.draw do
  # resources :pokemons
  # resources :trainers
  
  resources :pokemons, only: [:show, :destroy]
  get '/trainers', to: 'trainers#index'
  # get '/pokemons/:id', to: 'pokemons#show'
  # delete '/pokemons/:id', to: 'pokemons#destroy'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
