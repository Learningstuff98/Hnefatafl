class Piece < ApplicationRecord
  belongs_to :game

  def valid_move?(coords)
    if self.y_coord > coords[1] || self.y_coord < coords[1]
      if self.x_coord == coords[0]
        return true
      end
    end
    if self.x_coord > coords[0] || self.x_coord < coords[0]
      if self.y_coord == coords[1]
        return true
      end
    end
  end

  def broadcast_update_signal
    ActionCable.server.broadcast 'games',
      update_is_needed: "for_pieces",
      game_id: game.id
  end

  def restore_coords(origional_coords)
    self.update_attribute(:x_coord, origional_coords[0])
    self.update_attribute(:y_coord, origional_coords[1])
  end

end
