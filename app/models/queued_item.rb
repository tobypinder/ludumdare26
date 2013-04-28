class QueuedItem < ActiveRecord::Base
  belongs_to :user

  ##process the event
  def process
    case self.action
    when 'move_rest'
      
    when 'move_left'
      attempt_move Position.find_by_x_and_y(
          self.user.position.x-1,
          self.user.position.y
      )
    when 'move_right'
      attempt_move Position.find_by_x_and_y(
          self.user.position.x+1,
          self.user.position.y
      )
    when 'move_up'
      attempt_move Position.find_by_x_and_y(
          self.user.position.x,
          self.user.position.y-1
      )
    when 'move_down'  
      attempt_move Position.find_by_x_and_y(
          self.user.position.x,
          self.user.position.y+1
      )
    end 
  end  
  ##processes the event, destroying it!
  def process!
    self.process
    self.destroy
  end

  def attempt_move pos
    unless pos.nil?
      self.user.position = pos
      self.user.save
    end
  end
end
