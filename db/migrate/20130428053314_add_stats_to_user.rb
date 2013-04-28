class AddStatsToUser < ActiveRecord::Migration
  def change
    add_column :users, :HP, :integer, null: false,      default: 1000
    add_column :users, :maxHP, :integer, null: false,   default: 1000
    add_column :users, :maxQP, :integer, null: false,   default: 10
    add_column :users, :regenHP, :integer, null: false, default: 7 
    add_column :users, :attack, :integer, null: false,  default: 500
    add_column :users, :defence, :integer, null: false, default: 200
    add_column :users, :exp, :integer, null: false,     default: 0
  end
end
