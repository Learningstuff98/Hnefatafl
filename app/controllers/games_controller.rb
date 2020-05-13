class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!

  def index
    Game.all.each do |game|
      if game.attacker == "" || game.defender == ""
        redirect_to game_path(game)
        return
      end
    end
  end

  def create
    @game = current_user.games.create()
    @game.create_pieces()
    @game.broadcast_update_signal("for_lobby")
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
    starting_turn_status = game.attackers_turn
    game.update_attributes(game_params)
    if starting_turn_status != game.attackers_turn
      game.broadcast_update_signal("for_turn")
    else
      game.broadcast_update_signal("for_game_info")
    end
    head :ok
  end

  private

  def game_params
    params.require(:game).permit(:kingshealth, :attacker, :defender, :attackers_turn)
  end

end
