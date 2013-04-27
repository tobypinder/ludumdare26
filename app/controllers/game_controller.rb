class GameController < ApplicationController
  
  before_filter :authenticate_user! 

  def index
     current_user.init_defaults
  end
end
