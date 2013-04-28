# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
rng = Random.new(1337)

Position.transaction do
  (-30..30).each do |y|
    print "#{y.to_s.rjust(3,' ')}:"
    (-30..30).each do |x|


      spawnX = ((x < 12) && (x > -12))
      spawnY = ((y < 12) && (y > -12))

      radialDistance = Math.hypot(x,y)

      #12
      if(((rng.rand(1..12) == 1) && !(spawnX && spawnY)) || radialDistance > 30)
        print 'X'
      else
        Position.find_or_create_by_x_and_y(x,y)
        print '.'
      end
    end 
    print "\n"
  end  
end

ruleset = GameRules.find_or_create_by_id(1)
#ruleset.lastTick = Time.now.to_i
ruleset.tickRate = !Rails.env.production? ? 5: 60 #seconds
ruleset.save
