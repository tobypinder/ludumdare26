class UsersController < ApplicationController
  before_action :signed_in_user,  only: [:index, :edit, :update, :destroy] #sessions_helper
  #before_action :signed_out_user, only: [:new,   :create]  
  before_action :correct_user,    only: [:edit,  :update]
  before_action :admin_user,      only: :destroy

  def index
    @users = User.paginate(page: params[:page])
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    @microposts = @user.microposts.paginate(page: params[:page])
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Sample App!"
      redirect_to @user
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      sign_in @user
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    @user = User.find(params[:id])
    if current_user?(@user)
      flash[:error] = "You can't delete yourself!"
    else
      User.find(params[:id]).destroy
      flash[:success] = "User destroyed."
    end
    redirect_to users_url
  end


  private
    #Mass assignment protection.
    def user_params
      params.require(:user).permit(
        :name, 
        :email, 
        :password,
        :password_confirmation
        )
    end

    # Before filters
    def signed_out_user
      if signed_in?
        store_location
        redirect_to root_url, notice: "Can't create users while signed in!"
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end

    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end
end
