class Enemy < ActiveRecord::Base

  belongs_to :position 
  belongs_to :game_rules

  def death!
    Enemy.find(self).destroy
  end

  def kill! murderer
    rng = Random.new()
    x = rng.rand(1..(300/self.loot_level).to_i)
    case x
    when 1   
      murderer.regenHP += 1  
    when 2..10
      murderer.maxHP += 5
    when 11..18
      murderer.attack += 1
    when 19..22
      murderer.defence += 1  
    end 
    murderer.save

    ##seed 2 monsters :D
    monstersLeft=2
    attemptsLeft=10
    while attemptsLeft > 0 && monstersLeft > 0 
      p = Position.find_by(
          x:rng.rand(-30..30),
          y:rng.rand(-30..30)
      ) 
      unless p.nil?
        Enemy.make(p)
        monstersLeft = monstersLeft - 1
      end
      attemptsLeft = attemptsLeft - 1 
    end  
    death!

  end

  ##AI.
  def turn

  end


  def to_s
    "#{self.name}\tHP:#{self.HP}\tAtk:#{self.attack}\tDef:#{self.defence}\tLootLv:#{self.loot_level}"
  end

  def self.make p
    range_level = Math.hypot(p.x,p.y)

    rng = Random.new()
    level = rng.rand(1..10000);
    #level = Math.sqrt(10000-level)
    level = Math.sqrt(10000-level)
    
    level = (level+range_level-10);


    quality = rng.rand(1..100)
    type = rng.rand(1..100)

    obj = Enemy.new(position: p)

    quality_name = ''
    type_name = ''

    obj.HP         = 400
    obj.attack     = 250
    obj.defence    = 30
    obj.loot_level =  0


    case quality
    when 1..30
      quality_name = ' Awful' 
      obj.loot_level += 3
    when 31..55
      quality_name = ' Weak'
      obj.HP      += 100
      obj.attack  += 10
      obj.defence += 15
      obj.loot_level += 7
    when 56..70
      quality_name = ''
      obj.HP      += 150
      obj.attack  += 15
      obj.defence += 35  
      obj.loot_level += 15
    when 71..85
      quality_name = ' Strong'
      obj.HP      += 600
      obj.attack  += 40
      obj.defence += 75
      obj.loot_level += 25
    when 86..95
      quality_name = ' Power'
      obj.HP      += 1200
      obj.attack  += 75
      obj.defence += 105
      obj.loot_level += 40
    when 96..100
      quality_name = ' Boss'
      obj.HP      += 2500
      obj.attack  += 150
      obj.defence += 200
      obj.loot_level += 60
    end 
    
    case type
    when 1..40
      type_name = ' Looter'
      obj.defence   = obj.defence * 1.2
      obj.HP        = obj.HP / 1.2
    when 41..75
      type_name = ' Bandit'
      obj.attack    = obj.attack * 1.1
      obj.defence   = obj.defence / 1.1
    when 76..100
      type_name = ' Warlock'
      obj.HP        = obj.HP * 2
      obj.attack    = obj.attack / 1.25
      obj.defence   = obj.defence / 1.25
    end       
     
    #puts "HP:#{obj.HP} Atk:#{obj.attack} Def:#{obj.defence}"

    obj.HP       = (obj.HP      *  (1+(level/100))).to_i
    obj.attack   = (obj.attack  *  (1+(level/100))).to_i
    obj.defence  = (obj.defence *  (1+(level/100))).to_i
    
    #puts "HP:#{obj.HP} Atk:#{obj.attack} Def:#{obj.defence}"

    
    obj.loot_level += Math.sqrt(level)
    obj.loot_level += range_level
    obj.loot_level =  obj.loot_level.to_i

    level=level.to_i

    obj.name = "L#{level}#{quality_name}#{type_name}"

    #level

    puts obj
    obj
  end


end
