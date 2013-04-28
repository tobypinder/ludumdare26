class QueuedItem < ActiveRecord::Base
  belongs_to :user

  ##process the event
  def process
    user.process_queue_item(self.action)
  end  
  ##processes the event, destroying it!
  def process!
    self.process
    self.destroy
  end

  
end
