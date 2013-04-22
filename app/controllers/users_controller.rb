class UsersController < ApplicationController


  def create
    @user = User.new(user_params)
    if @user.save
      # Handle a successful save.
    else
      render 'new'
    end
  end

  def show
    @user = User.find(params[:id])
  end

  
  def new
    @user = User.new
  end

  private
    #Mass assignment protection.
    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end
end
