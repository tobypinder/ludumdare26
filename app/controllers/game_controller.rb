class GameController < ApplicationController
  
  before_filter :authenticate_user! 
  respond_to :json, except: [:index]
  def index
     current_user.init_defaults
  end

  def player_info
    current_user.position

    respond_with current_user.as_json(include: [:position,:queued_items])
  end  
end
