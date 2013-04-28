class MiscController < ApplicationController
  before_filter :authenticate_user! 
  skip_before_filter :check_player

  def dying  
    if params[:confirmdeath] == 'confirm'

      current_user.death!
      redirect_to root_url
    end
  end
end
