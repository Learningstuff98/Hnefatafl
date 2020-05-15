require 'rails_helper'

RSpec.describe PiecesController, type: :controller do
  describe "pieces#update action" do
    it "should let the coordinates of the piece be updated" do
      game = FactoryBot.create(:game)
      piece = FactoryBot.create(:piece)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        id: piece.id,
        game_id: game.id,
        piece: {
          x_coord: 1,
          y_coord: 1
        }
      }
      piece.reload
      expect(piece.x_coord).to eq 1
      expect(piece.y_coord).to eq 1
    end

    it "should invert the current turn" do
      game = FactoryBot.create(:game)
      piece = FactoryBot.create(:piece)
      user = FactoryBot.create(:user)
      sign_in user
      post :update, params: {
        id: piece.id,
        game_id: game.id,
        piece: {
          x_coord: 1,
          y_coord: 1
        }
      }
      game.reload
      expect(game.attackers_turn).to eq false
    end

    it "should require that a user be logged in" do
      game = FactoryBot.create(:game)
      piece = FactoryBot.create(:piece)
      post :update, params: {
        id: piece.id,
        game_id: game.id,
        piece: {
          x_coord: 1,
          y_coord: 1
        }
      }
      expect(response).to redirect_to new_user_session_path
    end
  end

  describe "pieces#destroy action" do
    it "should let pieces get removed from the game" do
      game = FactoryBot.create(:game)
      piece = FactoryBot.create(:piece)
      user = FactoryBot.create(:user)
      sign_in user
      delete :destroy, params: {
        game_id: game.id,
        id: piece.id
      }
      piece = Piece.find_by_id(piece.id)
      expect(piece).to eq nil
    end

    it "should require that a user be logged in" do
      game = FactoryBot.create(:game)
      piece = FactoryBot.create(:piece)
      delete :destroy, params: {
        game_id: game.id,
        id: piece.id
      }
      expect(response).to redirect_to new_user_session_path
    end
  end
end
