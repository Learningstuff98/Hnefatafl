Rails.application.routes.draw do
  devise_for :users
  root 'static_pages#index'
  resources :games, only: [:create, :show, :destroy] do
    resources :pieces, only: [:index]
  end
end
