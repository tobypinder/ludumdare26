# 
# The position model exists as a common framework for tile coords in case I need to add
# floors, other maps etc. Currently just [x,y]
#
class Position < ActiveRecord::Base
  has_many :users

  

end
