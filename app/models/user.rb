class User < ActiveRecord::Base
  belongs_to :position
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validate :init_defaults

  #keep this non-destructive!
  def init_defaults
    #if new_record?
      self.position ||= 
        Position.find_by_x_and_y(rand(-30..30),rand(-30..30)) #initial starting pos
    #elsif some_int.nil?
    #  errors.add(:some_int, "can't be blank on update")
    #end
  end
end
