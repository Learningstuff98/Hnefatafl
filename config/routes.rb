Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'static_pages#index'
  get 'how_to_play', to: 'static_pages#how_to_play'
  resources :games, only: [:create, :show, :destroy, :edit, :update, :index] do
    resources :pieces, only: [:index, :update, :destroy]
  end
end
