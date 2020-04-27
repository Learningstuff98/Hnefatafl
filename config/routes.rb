Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'static_pages#index'
  resources :games, only: [:create, :show, :destroy] do
    resources :pieces, only: [:index, :update]
  end
end
