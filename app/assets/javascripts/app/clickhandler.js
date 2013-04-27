var ClickHandler={
  //Assume:
  //obj = new Object();
  //obj.ui_x=x;
  //obj.ui_y=y;
  //obj.ui_w=w;
  //obj.ui_h=h;
  //obj.event_click=evt;
  objs:[],
  process:function(event){
    //loops thru clickable objs :)
    var x = event.pageX - GameCanvas.pageOffsetLeft;
    var y = event.pageY - GameCanvas.pageOffsetTop;
    var c = ClickHandler.translate(x,y); //clicked point
    console.log("You clicked canvas coord ["+x+","+y+"] (["+c.x+","+c.y+"])")
    for(idx in ClickHandler.objs)
    {

      target=ClickHandler.objs[idx]; 
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
  translate:function(x,y)
  {
    return obj={
      x:x-Config.UIWORLD_WIDTH/2,
      y:y-Config.UIWORLD_HEIGHT/2
    }
  }
}