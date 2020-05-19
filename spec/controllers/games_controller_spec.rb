require 'rails_helper'

RSpec.describe GamesController, type: :controller do
  describe "games#create action" do
    it "should let users start games" do
      user = FactoryBot.create(:user)
      sign_in user
      post :create
      expect(response).to have_http_status(:found)
      game = Game.last
      expect(game.user_id).to eq(user.id)
      expect(game.attackers_turn).to eq true
      expect(game.pieces.count).to eq 41
    end

    it "should require that a user be logged in" do
      post :create
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#show action" do
    it "should successfully show the page" do
      game = FactoryBot.create(:game)
      user = FactoryBot.create(:user)
      sign_in user
      get :show, params: { id: game.id }
      expect(response).to have_http_status(:success)
    end

    it "should require that a user be logged in" do
      game = FactoryBot.create(:game)
      get :show, params: { id: game.id }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#update action" do
    it "should let players make updates" do
      game = FactoryBot.create(:game)
      user = FactoryBot.create(:user)
      sign_in user
      patch :update, params: { 
        id: game.id,
        game: {
          attacker: user.username
        }
      }
      game.reload
      expect(game.attacker).to eq user.username
    end

    it "should require that a user be logged in" do
      game = FactoryBot.create(:game)
      patch :update, params: { 
        id: game.id,
        game: {
          attackers_turn: false
        }
      }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "games#index action" do
    it "should require that a user be logged in" do
      get :index
      expect(response).to redirect_to new_user_session_path
    end

    it "should successfully show the page" do
      user = FactoryBot.create(:user)
      sign_in user
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "games#destroy action" do
    it "should let players end matches" do
      game = FactoryBot.create(:game)
      game.create_pieces()
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: {
        id: game.id
      }
      expect(response).to redirect_to root_path
      expect(Game.all.count).to eq 0
      expect(Piece.all.count).to eq 0
    end

    it "should require that a user be logged in" do
      game = FactoryBot.create(:game)
      game.create_pieces()
      delete :destroy, params: {
        id: game.id
      }
      expect(response).to redirect_to new_user_session_path
    end
  end
end
