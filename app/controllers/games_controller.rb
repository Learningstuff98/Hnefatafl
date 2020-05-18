class GamesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:update]
  before_action :authenticate_user!

  def index
    @vacant_games = []
    if Game.all.count > 0
      @vacant_games = Game.first.get_vacant_games
    end
  end

  def create
    @game = current_user.games.create()
    @game.create_pieces()
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find(params[:id])
  end

  def destroy #needs tests
    game = Game.find_by_id(params[:id])
    if game
      game.pieces.destroy_all
      game.destroy
    end
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
