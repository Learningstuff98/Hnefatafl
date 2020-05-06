class AddDefenderToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :defender, :string, default: ""
  end
end
