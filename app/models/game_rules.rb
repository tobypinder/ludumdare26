# There should only EVER be one of these, it exists as a DB object for tick management
# And associating Tick metadata with objects.
#
class GameRules < ActiveRecord::Base
  has_many :users

  #lastTick, tickRate
  def tick
    self.totalTicks = self.totalTicks + 1
    self.lastTick = Time.now.to_i

    #immediately save to limit concurrency issues THOUGH THEY STILL WILL EXIST!
    self.save

    self.users.includes([:queued_items]).each do |u|
      if u.queued_items.length > 0
        u.queued_items.first.process!
      end
    end
    self.save
  end

  #purely academic: we'd rather be slow than dole out a crazy number of ticks!
  def ticks_needed
      ((Time.now.to_i - self.lastTick)/self.tickRate).to_i 
  end  

  def tick_needed?
    self.now = Time.now.to_i
    self.ticks_needed >= 1
  end
end
