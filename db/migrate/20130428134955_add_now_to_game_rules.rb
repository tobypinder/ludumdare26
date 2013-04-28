class AddNowToGameRules < ActiveRecord::Migration
  def change
    add_column :game_rules, :now, :integer, default:0, null:false
  end
end
