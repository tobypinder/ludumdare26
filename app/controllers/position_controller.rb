class PositionController < ApplicationController

  before_filter :authenticate_user! 
  respond_to :json
  
  def show
    respond_with current_user.position
  end  

  #enqueue
  def move_right
    respond_with enqueue(:move_right)    
  end
  def move_up
    respond_with enqueue(:move_up)   
  end
  def move_left
     
    respond_with enqueue(:move_left)   
  end
  def move_down
    
    respond_with enqueue(:move_down)
  end
  def move_rest
    
    respond_with enqueue(:move_rest)
  end  
private
  def enqueue type
    #check prerequisites etc.
    if current_user.queued_items.count < current_user.maxQP
      current_user.queued_items.create(action: type)
    else
      #todo: Handle people queueing too much.
    end
    current_user.queued_items #return
  end  
end
