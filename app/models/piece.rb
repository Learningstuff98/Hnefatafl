class Piece < ApplicationRecord
  belongs_to :game

  def broadcast_update_signal
    ActionCable.server.broadcast 'games',
      update_is_needed: "for_pieces",
      game_id: game.id
  end

end
