class GameController < ApplicationController
  
  before_filter :authenticate_user! 
  respond_to :json, except: [:index]
  def index
     current_user.player_status_check
  end

  def player_info
    current_user.position

    respond_with current_user.as_json(include: [:position,:queued_items,:game_rules])
  end  
end
