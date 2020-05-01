class AddKingshealthToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :kingshealth, :string, default: "good"
  end
end
