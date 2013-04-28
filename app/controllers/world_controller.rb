class WorldController < ApplicationController

  before_filter :authenticate_user! 
  respond_to :json
  
  #A world is really just a collection of positions. This is going to be hefty
  #for Ludum Dare since I really don't intend to mess about with streaming pieces of
  #the world in (as needed in future for scalability)
  def show

    x = current_user.position.x.to_i
    y = current_user.position.y.to_i

    world = Position.where("
      x >= :x_min AND
      x <= :x_max AND
      y >= :y_min AND
      y <= :y_max
    ", {
      x_min: x-5,
      x_max: x+5,
      y_min: y-5,
      y_max: y+5
    });

    respond_with world
  end  


end
