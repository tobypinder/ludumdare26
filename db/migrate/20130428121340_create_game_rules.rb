class CreateGameRules < ActiveRecord::Migration
  def change
    create_table :game_rules do |t|
      t.integer :lastTick,    default:0,    null:false
      t.integer :totalTicks,  default:0,    null:false
      t.integer :tickRate,    default:60,   null:false
    end
  end
end
