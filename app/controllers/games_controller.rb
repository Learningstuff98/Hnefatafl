class GamesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :show]

  def create
    @game = current_user.games.create()
  
    @game.pieces.create(piece_type: "attacker", x_coord: 4, y_coord: 1)
    @game.pieces.create(piece_type: "attacker", x_coord: 5, y_coord: 1)
    @game.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 1)
    @game.pieces.create(piece_type: "attacker", x_coord: 7, y_coord: 1)
    @game.pieces.create(piece_type: "attacker", x_coord: 8, y_coord: 1)
    @game.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 2)

    @game.pieces.create(piece_type: "attacker", x_coord: 4, y_coord: 11)
    @game.pieces.create(piece_type: "attacker", x_coord: 5, y_coord: 11)
    @game.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 11)
    @game.pieces.create(piece_type: "attacker", x_coord: 7, y_coord: 11)
    @game.pieces.create(piece_type: "attacker", x_coord: 8, y_coord: 11)
    @game.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 10)

    @game.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 4)
    @game.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 5)
    @game.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 6)
    @game.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 7)
    @game.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 8)
    @game.pieces.create(piece_type: "attacker", x_coord: 10, y_coord: 6)

    @game.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 4)
    @game.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 5)
    @game.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 6)
    @game.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 7)
    @game.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 8)
    @game.pieces.create(piece_type: "attacker", x_coord: 2, y_coord: 6)

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

end
