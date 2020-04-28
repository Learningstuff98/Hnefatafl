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
    origional_coords = [piece.x_coord, piece.y_coord]
    piece.update_attributes(piece_params)
    if piece.valid_move?(origional_coords)
      piece.broadcast_update_signal
      head :ok
    else
      piece.restore_coords(origional_coords)
    end
  end

  private

  def piece_params
    params.require(:piece).permit(:x_coord, :y_coord)
  end

end
