Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users
  root 'static_pages#index'
  resources :games, only: [:create, :show, :destroy, :edit, :update] do
    resources :pieces, only: [:index, :update, :destroy]
  end
end
