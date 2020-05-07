class AddAttackersTurnToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :attackers_turn, :boolean, default: true
  end
end
