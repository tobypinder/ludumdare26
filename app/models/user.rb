class User < ActiveRecord::Base
  belongs_to :position 
  belongs_to :game_rules
  has_many :queued_items
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable
         #:validatable broken with change to usernames
 

  after_initialize :player_status_check

  validates :username, :uniqueness => true


  def move_up
    new_pos = Position.find_by_x_and_y(self.position.x, self.position.y - 1)
    save_position! new_pos
  end

  def move_downself
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
    unless self.id.nil?
      #init junk if needed.
      if self.position.nil?
        self.position ||= 
          Position.find_by(x: rand(-10..10), y: rand(-10..10)) #initial starting pos
        self.save
      end

      if self.game_rules.nil?
        self.game_rules ||= GameRules.find_by(id:1) 
        self.save
      end


      #Death check
      if self.HP <= 0
        self.dying=true;
        self.save
      end  
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
      self.save
      true
    end  
    ##
    self.position
  end


end
