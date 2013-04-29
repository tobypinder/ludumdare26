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
        players:raw[i].position.users,
        enemies:raw[i].position.enemies
      };
    }
  },
  //Local x and y
  getTileObjects:function(x,y)
  {
    obj=[];

    stuff=World.data[x+'_'+y];
    if(stuff)
    {
      for(var i=0;i<stuff.players.length;i++)
      {
        var playerObj={type:'player',obj:stuff.players[i]}
        if(obj.username != Player.username)
        {
          obj.push(playerObj);
        }
      }
      for(var i=0;i<stuff.enemies.length;i++)
      {
        var enemyObj={type:'enemy',obj:stuff.enemies[i]}
        obj.push(enemyObj);
      }
    } else {
      console.log("Not inspecting!");
    }

    return obj;
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
      //console.log("X: "+x+" Y: "+y+"   P: "+this.data[x+"_"+y].players.length);
      return this.data[x+"_"+y].players.length
    } else {
      return 0;
    }
  },
  positionEnemyCount:function(x,y)
  {
    if(World.positionIsValid(x,y) && this.data[x+"_"+y].enemies.length>0)
    {
      //console.log("X: "+x+" Y: "+y+"   E: "+this.data[x+"_"+y].enemies.length);
      return this.data[x+"_"+y].enemies.length
    } else {
      return 0;
    }
  }
}