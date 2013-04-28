class AddGameRulesIdToUsers < ActiveRecord::Migration
  def up
    add_column :users, :game_rules_id, :integer, default:0, null:false
    User.all.each do |x|
      x.update_attributes(game_rules_id: 1)
    end
  end
  def down
    remove_column :users, :game_rules_id, :integer
  end
end
