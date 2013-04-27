class PositionController < ApplicationController

  before_filter :authenticate_user! 
  respond_to :json
  
  def show1
    respond_with current_user.position
  end  

end
