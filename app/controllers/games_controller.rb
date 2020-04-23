class GamesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :show]

  def create
    @game = current_user.games.create()
    redirect_to game_path(@game)
  end

  def show
    @game = Game.find(params[:id])
  end

  def destroy
    game = Game.find(params[:id])
    game.destroy
    redirect_to root_path
  end

end
