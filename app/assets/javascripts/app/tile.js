function Tile(x,y,ui_x,ui_y,ui_w,ui_h,obj)
{
  this.x    = x;
  this.y    = y;
  this.ui_x = ui_x;
  this.ui_y = ui_y;
  this.ui_w = ui_w;
  this.ui_h = ui_h;
  this.selected = false;
  this.isCharacterLocation  = false
  this.isWithinRange        = false
  this.isImpassable         = false


  this.event_click=function(event)
  {
    //do stuff with this tile
    this.selected=!this.selected;
  }

  this.render=function(ctx)
  {
    ctx.strokeStyle = Styles.Colors.gridLines;
    ctx.fillStyle   = Styles.Colors.black;
    ctx.lineWidth   = Styles.LineWidth.thin;
    
    //Special Case overrides - first = lowest priority

    
    if(this.isWithinRange){
      ctx.fillStyle = Styles.Colors.withinRangeTile;
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
      }
      if(
        (tile.x==1  && tile.y ==0)  ||
        (tile.x==-1 && tile.y ==0)  ||
        (tile.x==0  && tile.y ==1)  ||
        (tile.x==0  && tile.y ==-1) 
      )
      {
        tile.isWithinRange = true
      }
      

      if(!World.positionIsValid(
          Player.position.x + tile.x,
          Player.position.y + tile.y
      )){
        tile.isImpassable = true
      }

    }
    
  }
}