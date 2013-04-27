class AddDefaultValueToPositionOfPlayer < ActiveRecord::Migration
  def change
    change_column :users, :position_id, :integer, default: 1861 ##HACK!
  end
end
