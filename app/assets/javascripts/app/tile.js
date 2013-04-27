function Tile(x,y,ui_x,ui_y,ui_w,ui_h)
{

  this.ui_x=ui_x;
  this.ui_y=ui_y;
  this.ui_w=ui_w;
  this.ui_h=ui_h;
  this.selected=false;

  this.event_click=function(event)
  {
    //do stuff with this tile
    this.selected=!this.selected;
  }

  this.render=function(ctx)
  {
    ctx.strokeStyle = Styles.Colors.gridLines;

    if(this.selected){
      ctx.fillStyle = Styles.Colors.selected;
    } 
    ctx.lineWidth   = Styles.LineWidth.thin;

    ctx.beginPath();
      ctx.rect(
        this.ui_x, 
        this.ui_y, 
        this.ui_w, 
        this.ui_h);
    if(this.selected){
      ctx.fill()
    }
    ctx.stroke();
  }


}

var Tiles={
  init:function()
  {
    var ts=Config.TILE_SIZE;
    for(var i=-5;i<=5;i++)
    {
      for(var j=-5;j<=5;j++)
      {
        var tile= new Tile(
          null,
          null,
          -(ts/2)+ts*i, 
          -(ts/2)+ts*j, 
          ts, 
          ts
        );
        
        GameObjects.Tiles.list.push(tile);
        ClickHandler.add(tile);

      }
    }  
  }
}