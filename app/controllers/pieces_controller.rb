class PiecesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    game = Game.find(params[:game_id])
    render json: game.pieces.as_json()
  end

end
