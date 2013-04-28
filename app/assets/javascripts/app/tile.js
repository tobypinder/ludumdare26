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
  this.isCharacterLocation  = false
  this.isWithinRange        = false
  this.isImpassable         = false




  this.event_click=function(event)
  {
    //do stuff with this tile
    this.selected=!this.selected;
  }
  this.worldX=function(){return Player.x+x}
  this.worldY=function(){return Player.x+x}
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
    if(this.isSlug){
      ctx.fillStyle = Styles.Colors.slugTrail();
    }
    if(this.selected){
      ctx.fillStyle = Styles.Colors.selected;
    } 
    if(this.isCharacterLocation){
      ctx.strokeStyle = Styles.Colors.characterTile;
      ctx.fillStyle = Styles.Colors.characterTile;
    } 
    if(this.isImpassable){
      ctx.strokeStyle = Styles.Colors.impassableGrid;
      ctx.fillStyle = Styles.Colors.impassableTile;
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
      

      if(!World.positionIsValid(
          Player.position.x + tile.x,
          Player.position.y + tile.y
      )){
        tile.isImpassable = true
      } else {
        tile.isImpassable = false
      }

    }
    
  }
}