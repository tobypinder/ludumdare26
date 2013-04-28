class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :check_player
  before_filter :check_tick

  def check_player
    if(current_user.present? && current_user.dying)
      redirect_to misc_dying_path
    end
  end  

  def check_tick
    if(current_user.present? && current_user.game_rules.present? && current_user.game_rules.tick_needed?)
      #poor man's cron
      current_user.game_rules.tick
    end
  end  
  

end
