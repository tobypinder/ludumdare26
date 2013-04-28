class User < ActiveRecord::Base
  belongs_to :position 
  has_many :queued_items
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
         #:validatable broken with change to usernames
 
  before_create :init_defaults

  after_initialize :player_status_check

  validates :username, :uniqueness => true

  #keep this non-destructive!
  #TODO: Add all the idle stuff etc.
  def init_defaults
    self.position ||= 
      Position.find_by_x_and_y(rand(-10..10),rand(-10..10)) #initial starting pos
  end

  def move_up
    new_pos = Position.find_by_x_and_y(self.position.x, self.position.y - 1)
    save_position! new_pos
  end

  def move_down
    new_pos = Position.find_by_x_and_y(self.position.x, self.position.y + 1)
    save_position! new_pos
  end

  def move_left
    new_pos = Position.find_by_x_and_y(self.position.x - 1, self.position.y)
    save_position! new_pos
  end
  def move_right
    new_pos = Position.find_by_x_and_y(self.position.x + 1, self.position.y)
    save_position! new_pos
  end
  def move_rest
  end  
  def player_status_check
    if self.HP <= 0
      self.dying=true;
      self.save!
    end  
  end  

  def death!
    User.find(self).destroy
  end

private
  def save_position! new_pos
    if new_pos.nil?
      false
    else
      self.position = new_pos
      self.save!
      true
    end  
    ##
    self.position
  end


end
