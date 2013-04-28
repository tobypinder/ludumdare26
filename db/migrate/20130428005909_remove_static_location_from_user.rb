class RemoveStaticLocationFromUser < ActiveRecord::Migration
  def change
    change_column :users, :position_id, :integer, :default => nil
  end
end
