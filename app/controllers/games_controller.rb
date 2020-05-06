class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!

  def create
    @game = current_user.games.create()
    @game.create_pieces()
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find(params[:id])
  end

  def destroy
    game = Game.find(params[:id])
    game.pieces.destroy_all
    game.destroy
    redirect_to root_path
  end

  def edit
    game = Game.find(params[:id])
    render json: game.as_json()
  end

  def update
    game = Game.find(params[:id])
    game.update_attributes(game_params)
    game.broadcast_update_signal
    head :ok
  end

  private

  def game_params
    params.require(:game).permit(:kingshealth, :attacker, :defender)
  end

end
