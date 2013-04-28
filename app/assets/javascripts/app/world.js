World={
  data:{},
  update:function(raw)
  {
    World.data = {}
    for(var i=0;i<raw.length;i++) 
    {
      World.data[raw[i].position.x+'_'+raw[i].position.y]=
      {
        walk:true,
        players:raw[i].position.users
      };
    }
  },
  //Determine if pos is in db
  positionIsValid:function(x,y)
  {
    return this.data.hasOwnProperty(x+"_"+y);
  },
  positionPlayerCount:function(x,y)
  {
    if(World.positionIsValid(x,y) && this.data[x+"_"+y].players.length>0)
    {
      console.log("Players detected!")
      console.log("["+x+"_"+y+"]")
      console.log(this.data[x+"_"+y].players);
      return this.data[x+"_"+y].players.length
    } else {
      return 0;
    }
  }
}