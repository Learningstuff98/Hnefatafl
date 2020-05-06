class AddAttackerToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :attacker, :string, default: ""
  end
end
