class AddDyingToUser < ActiveRecord::Migration
  def change
    add_column :users, :dying, :boolean, null: false, default: false
  end
end
