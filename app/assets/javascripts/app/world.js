var World={
  data:[],
  update:function(raw)
  {
    World.data = []
    for(idx in raw) 
    {
      World.data['x'+raw[idx].position.x+'_y'+raw[idx].position.y]={};
    }
  },
  //Determine if pos is in db
  positionIsValid:function(x,y)
  {
    return this.data.hasOwnProperty("x"+x+"_y"+y);
  }
}