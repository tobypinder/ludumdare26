World={
  data:{},
  update:function(raw)
  {
    World.data = {}
    for(var i=0;i<raw.length;i++) 
    {
      World.data[raw[i].position.x+'_'+raw[i].position.y]={walk:true};
    }
  },
  //Determine if pos is in db
  positionIsValid:function(x,y)
  {
    return this.data.hasOwnProperty(x+"_"+y);
  }
}