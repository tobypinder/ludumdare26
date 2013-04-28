class CreateQueuedItems < ActiveRecord::Migration
  def change
    create_table :queued_items do |t|
      t.integer :user_id, null: false
      t.string  :action, null: false, default: 'wait'

      t.timestamps
    end
  end
end
