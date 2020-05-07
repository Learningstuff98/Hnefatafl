class Piece < ApplicationRecord
  belongs_to :game

  def broadcast_update_signal(signal)
    ActionCable.server.broadcast 'games',
      update_is_needed: signal,
      game_id: game.id
  end

end
