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

  #ONLY get active users
  default_scope lambda{ where(:updated_at => (Time.now - 3.hours)..Time.now) }
  scope :living, lambda{ where(dying: false) }

  def move_up
    new_pos = Position.find_by(
      x:self.position.x, 
      y:self.position.y - 1
    )
    save_position! new_pos
  end

  def move_downself
    new_pos = Position.find_by(
      x:self.position.x, 
      y:self.position.y + 1
    )
    save_position! new_pos
  end

  def move_left
    new_pos = Position.find_by(
      x:self.position.x - 1, 
      y:self.position.y
    )
    save_position! new_pos
  end
  def move_right
    new_pos = Position.find_by(
      x:self.position.x + 1, 
      y:self.position.y
    )
    save_position! new_pos
  end
  def move_rest
    regenerate self.regenHP
  end  

  def move_idle
    regenerate (self.regenHP/3).to_i

    attempt_attack
  end

  def regenerate amt
    self.HP = [
      self.maxHP,
      self.HP + amt
    ].min
    self.save
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

  def attempt_move pos
    unless pos.nil?
      self.position = pos
      self.save
    end
  end

  def attempt_attack
    target = self.position.enemies.first;
    unless target.nil?
      target.HP =  target.HP - (self.attack - target.defence)
      if target.HP <= 0
        target.kill!(self)
      else
        #retaliation.
        self.HP =  self.HP - (target.attack - self.defence)
        self.save
        target.save 
      end
    end
  end


##process the event
  def process_queue_item action
    #not a real command
    #when 'idle'
    #  self.regenerate_strong
    case action
      when 'move_idle'
        self.move_idle ##SHOULD NEVER BE CALLED
      when 'move_rest'
        self.move_rest
      when 'move_left'
        self.attempt_move Position.find_by(
            x: self.position.x-1,
            y: self.position.y
        )
      when 'move_right'
        self.attempt_move Position.find_by(
            x: self.position.x+1,
            y: self.position.y
        )
      when 'move_up'
        self.attempt_move Position.find_by(
            x: self.position.x,
            y: self.position.y-1
        )
      when 'move_down'  
        self.attempt_move Position.find_by(
            x: self.position.x,
            y: self.position.y+1
        )
    end 
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
