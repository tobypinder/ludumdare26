class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :check_player

  def check_player
    if(current_user.present? && current_user.dying)
      redirect_to misc_dying_path
    end
  end  
  

end
