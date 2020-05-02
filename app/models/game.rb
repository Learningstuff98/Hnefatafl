class Game < ApplicationRecord
  belongs_to :user
  has_many :pieces

  def create_pieces()
    self.pieces.create(piece_type: "attacker", x_coord: 4, y_coord: 1)
    self.pieces.create(piece_type: "attacker", x_coord: 5, y_coord: 1)
    self.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 1)
    self.pieces.create(piece_type: "attacker", x_coord: 7, y_coord: 1)
    self.pieces.create(piece_type: "attacker", x_coord: 8, y_coord: 1)
    self.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 2)

    self.pieces.create(piece_type: "attacker", x_coord: 4, y_coord: 11)
    self.pieces.create(piece_type: "attacker", x_coord: 5, y_coord: 11)
    self.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 11)
    self.pieces.create(piece_type: "attacker", x_coord: 7, y_coord: 11)
    self.pieces.create(piece_type: "attacker", x_coord: 8, y_coord: 11)
    self.pieces.create(piece_type: "attacker", x_coord: 6, y_coord: 10)

    self.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 4)
    self.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 5)
    self.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 6)
    self.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 7)
    self.pieces.create(piece_type: "attacker", x_coord: 11, y_coord: 8)
    self.pieces.create(piece_type: "attacker", x_coord: 10, y_coord: 6)

    self.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 4)
    self.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 5)
    self.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 6)
    self.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 7)
    self.pieces.create(piece_type: "attacker", x_coord: 1, y_coord: 8)
    self.pieces.create(piece_type: "attacker", x_coord: 2, y_coord: 6)

    self.pieces.create(piece_type: "defender", x_coord: 5, y_coord: 6)
    self.pieces.create(piece_type: "defender", x_coord: 7, y_coord: 5)
    self.pieces.create(piece_type: "defender", x_coord: 6, y_coord: 5)
    self.pieces.create(piece_type: "defender", x_coord: 6, y_coord: 7)
    self.pieces.create(piece_type: "defender", x_coord: 5, y_coord: 5)
    self.pieces.create(piece_type: "defender", x_coord: 7, y_coord: 6)
    self.pieces.create(piece_type: "defender", x_coord: 7, y_coord: 7)
    self.pieces.create(piece_type: "defender", x_coord: 5, y_coord: 7)
    self.pieces.create(piece_type: "defender", x_coord: 4, y_coord: 6)
    self.pieces.create(piece_type: "defender", x_coord: 6, y_coord: 4)
    self.pieces.create(piece_type: "defender", x_coord: 8, y_coord: 6)
    self.pieces.create(piece_type: "defender", x_coord: 6, y_coord: 8)
    self.pieces.create(piece_type: "defender", x_coord: 4, y_coord: 5)
    self.pieces.create(piece_type: "defender", x_coord: 4, y_coord: 7)
    self.pieces.create(piece_type: "defender", x_coord: 8, y_coord: 7)
    self.pieces.create(piece_type: "defender", x_coord: 8, y_coord: 5)

    self.pieces.create(piece_type: "king", x_coord: 6, y_coord: 6)
  end

  def broadcast_update_signal
    ActionCable.server.broadcast 'games',
      update_is_needed: "for_game_info",
      game_id: self.id
  end

end
