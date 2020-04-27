class PiecesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!
  
  def index
    game = Game.find(params[:game_id])
    render json: game.pieces.as_json()
  end

  def update
    game = Game.find(params[:game_id])
    piece = Piece.find(params[:id])
    piece.update_attributes(piece_params)
    ActionCable.server.broadcast 'games',
      update_is_needed: "for_pieces",
      game_id: game.id
    head :ok
  end

  private

  def piece_params
    params.require(:piece).permit(:x_coord, :y_coord)
  end

end
