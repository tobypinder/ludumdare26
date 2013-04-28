class WorldController < ApplicationController

  before_filter :authenticate_user! 
  respond_to :json
  
  #A world is really just a collection of positions. This is going to be hefty
  #for Ludum Dare since I really don't intend to mess about with streaming pieces of
  #the world in (as needed in future for scalability)
  def show

    x = current_user.position.x.to_i
    y = current_user.position.y.to_i

    world = Position.includes([:users]).where("
      x >= :x_min AND
      x <= :x_max AND
      y >= :y_min AND
      y <= :y_max
    ", {
      x_min: x-6,
      x_max: x+6,
      y_min: y-6,
      y_max: y+6
    })

    #TODO: HACKED AROUND THE EDGES FOR DISPLAY

    respond_with world.as_json(include: {users: {only: :username }})
  end  


end
