require 'rails_helper'

RSpec.describe Game, type: :model do
  it "get_vacant_games should return a list of vacant games" do
    game1 = FactoryBot.create(:game)
    game2 = FactoryBot.create(:game)
    game3 = FactoryBot.create(:game)
    expect(game1.get_vacant_games.count).to eq 3
  end

  it "get_vacant_games should only return the first five vacant games" do
    game1 = FactoryBot.create(:game)
    game2 = FactoryBot.create(:game)
    game3 = FactoryBot.create(:game)
    game4 = FactoryBot.create(:game)
    game5 = FactoryBot.create(:game)
    game6 = FactoryBot.create(:game)
    expect(game1.get_vacant_games.count).to eq 5
  end

  it "get_vacant_games shouldn't collect occupied games" do
    occupied_game = FactoryBot.create(:game)
    occupied_game.update_attribute(:attacker, "player_1")
    occupied_game.update_attribute(:defender, "player_2")
    expect(occupied_game.get_vacant_games.count).to eq 0
  end
end
