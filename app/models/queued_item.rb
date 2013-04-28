class QueuedItem < ActiveRecord::Base
  belongs_to :user, dependent: :destroy

  ##process the event
  def process
    case self.action
    when 'move_rest'
      
    when 'move_left'
      
    when 'move_right'
      
    when 'move_up'
      
    when 'move_down'  

    end 
  end  
  ##processes the event, destroying it!
  def process!
    self.process
  end

end
