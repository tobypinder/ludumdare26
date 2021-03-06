var ClickHandler={
  //Assume:
  //obj = new Object();
  //obj.ui_x=x;
  //obj.ui_y=y;
  //obj.ui_w=w;
  //obj.ui_h=h;
  //obj.coords=Config.COORDS_UI|WORLD
  //obj.event_click=evt;
  objs:[],
  process:function(event){
    //loops thru clickable objs :)
    
    //http://diveintohtml5.info/canvas.html
    //var x = event.pageX - GameCanvas.pageOffsetLeft;
    //var y = event.pageY - GameCanvas.pageOffsetTop;
    var x;
    var y;
    if (event.pageX != undefined && event.pageY != undefined) 
    {
      x = event.pageX;
      y = event.pageY;
    }
    else 
    {
      x = event.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x = x - GameCanvas.pageOffsetLeft();
    y = y - GameCanvas.pageOffsetTop();



    
    for(idx in ClickHandler.objs)
    {
      
      var target=ClickHandler.objs[idx]; 
      var c = ClickHandler.translate(target.coords,x,y); //clicked point
      //console.log(target);
      if(
        (c.x > target.ui_x) && 
        (c.y > target.ui_y) &&
        (c.x < (target.ui_x+target.ui_w)) &&
        (c.y < (target.ui_y+target.ui_h))
      )
      {
        ClickHandler.objs[idx].event_click(event);
      }
    }
  },
  add:function(obj){
    this.objs.push(obj);
  },
  /**
   * Translate into in-game coords, returning obj.x/y pair
   * TODO: Scale and Rotate Support!
   */
  translate:function(coords,x,y)
  {
    //console.log("Clicked UI:["+x+","+y+"] World:["+(x-Config.UIWORLD_WIDTH/2)+","+(y-Config.UIWORLD_HEIGHT/2)+"]")
    switch(coords) {
      case Config.COORDS_UI:
        return obj={
          x:x,
          y:y
        }
      break;
      case Config.COORDS_WORLD:
      default:
        return obj={
          x:x-Config.UIWORLD_WIDTH/2,
          y:y-Config.UIWORLD_HEIGHT/2
        }
      break;
    }
  }
}
