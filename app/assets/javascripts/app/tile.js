function Tile(x,y,ui_x,ui_y,ui_w,ui_h,obj)
{
  this.x    = x; //local grid
  this.y    = y; //local grid
  this.ui_x = ui_x;
  this.ui_y = ui_y;
  this.ui_w = ui_w;
  this.ui_h = ui_h;
  this.coords = Config.COORDS_WORLD
  this.selected = false;
  this.hasPlayers = false
  this.hasEnemies = false
  this.isCharacterLocation  = false
  this.isWithinRange        = false
  this.isImpassable         = false




  this.event_click=function(event)
  {
    //do stuff with this tile
    

    var selectReset=false;
    if(this.selected)
    {
      State.selectedTile_X = Player.position.x
      State.selectedTile_Y = Player.position.y
      selectReset=true
    } else {
       State.selectedTile_X = this.worldX()
       State.selectedTile_Y = this.worldY()
    }
    for(var i=0;i<GameObjects.Tiles.list.length;i++)
    {
      GameObjects.Tiles.list[i].selected = false;
    }
    if(!selectReset)
    {
      this.selected=true
    }
    //console.log("X: "+State.selectedTile_X+"  Y:"+State.selectedTile_Y);
    //Player.position.x + tile.x,
  }
  this.worldX=function(){return Player.position.x+x}
  this.worldY=function(){return Player.position.y+y}
  this.render=function(ctx)
  {

    //must check slug status every frame. Hawkward.
    this.isSlug = false;
    for(var i=0;i<GameObjects.Slug.list.length;i++)
    {
      var slug = GameObjects.Slug.list[i];
      if(slug.x == this.x && slug.y == this.y)
      {
        this.isSlug = true;
      }
    }





    ctx.strokeStyle = Styles.Colors.gridLines;
    ctx.fillStyle   = Styles.Colors.black;
    ctx.lineWidth   = Styles.LineWidth.thin;
    
    //Special Case overrides - first = lowest priority

    //this sucks.
    //if(this.isWithinRange){
    //  ctx.fillStyle = Styles.Colors.withinRangeTile;
    //} 
    
    

    if(this.hasPlayers){
      ctx.fillStyle = Styles.Colors.tileOtherPlayers();
    } 

    if(this.hasEnemies){
      ctx.fillStyle = Styles.Colors.tileEnemies();
    }     
    if(this.isSlug){
      ctx.fillStyle = Styles.Colors.slugTrail();
    }

    if(this.isCharacterLocation){
      ctx.strokeStyle = Styles.Colors.characterTile;
      ctx.fillStyle = Styles.Colors.characterTile;
    } 

    if(this.isImpassable){
      ctx.strokeStyle = Styles.Colors.impassableGrid;
      ctx.fillStyle = Styles.Colors.impassableTile;
    } 

    if(this.selected){
      ctx.fillStyle = Styles.Colors.selected;
    } 
    
    ctx.beginPath();
    ctx.rect(
      this.ui_x, 
      this.ui_y, 
      this.ui_w, 
      this.ui_h);
    ctx.fill()
    ctx.stroke();
  }

}

var Tiles={
  init:function()
  {
    var ts=Config.TILE_SIZE;
    for(var i=-Config.GRID_RADIUS;i<=Config.GRID_RADIUS;i++)
    {
      //render tile coords!

      for(var j=-Config.GRID_RADIUS;j<=Config.GRID_RADIUS;j++)
      {
        
        var tile= new Tile(
          i,
          j,
          -(ts/2)+ts*i, 
          -(ts/2)+ts*j, 
          ts, 
          ts
        );
        GameObjects.Tiles.list.push(tile);
        ClickHandler.add(tile);
      }
    }  
  }, 
  update:function()
  {
    
    for(var idx in GameObjects.Tiles.list)
    {

      tile = GameObjects.Tiles.list[idx];
      
      if(tile.x==0 && tile.y==0) {
        tile.isCharacterLocation = true;
      } else {
        tile.isCharacterLocation = false;
      }

      if(
        (tile.x==1  && tile.y ==0)  ||
        (tile.x==-1 && tile.y ==0)  ||
        (tile.x==0  && tile.y ==1)  ||
        (tile.x==0  && tile.y ==-1) 
      )
      {
        tile.isWithinRange = true
      } else {
        tile.isWithinRange = false
      }
      
      tile.hasPlayers =false;
      if(!World.positionIsValid(
          Player.position.x + tile.x,
          Player.position.y + tile.y
      )){
        tile.isImpassable = true
      } else {
        tile.isImpassable = false
        //check more world stuff since it's valid

        //PLAYERS
        if(
          World.positionPlayerCount(
             Player.position.x + tile.x,
            Player.position.y + tile.y
          )>0 && !tile.isCharacterLocation
        ) {
          
          tile.hasPlayers = true
        } else {
          tile.hasPlayers = false
        }

        //
        if(
          World.positionEnemyCount(
            Player.position.x + tile.x,
            Player.position.y + tile.y
          )>0 && !tile.isCharacterLocation
        ) {
          tile.hasEnemies = true
        } else {
          tile.hasEnemies = false
        }
      }
    }
  }
}