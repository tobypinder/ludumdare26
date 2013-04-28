var GameCanvas={
  obj:null,
  ctx:null,
  pageOffsetLeft:function(){return this.obj.offsetLeft}, //for clickhandling
  pageOffsetTop:function(){return this.obj.offsetTop}, //for clickhandling
  init:function()
  {
    this.obj = $('#thegame')[0]
    this.obj.width  = Config.WIDTH;
    this.obj.height = Config.HEIGHT;

    //get offsets for proper click handling.
    this.obj.addEventListener('click',
      function(event){ClickHandler.process(event)})

    this.ctx = this.obj.getContext("2d");
    this.ctx.translate(-0.5,-0.5); //cleanup lines
    this.reset(this.ctx);
  },
  render:function()
  {
    ctx=this.ctx;
    this.reset(this.ctx);
    ctx.font = Styles.Fonts.hugeBanner; 
    switch(State.uiState)
    {
      case State.UISTATE_LOADING:
        ctx.textAlign = 'center';
        ctx.fillStyle = Styles.Colors.blinkGreen(); 
        ctx.fillText("LOADING",Config.WIDTH/2,Config.HEIGHT/2);
      break;
      case State.UISTATE_ERROR:
        ctx.textAlign = 'center';
        ctx.fillStyle = Styles.Colors.blinkRed(); 
        ctx.fillText("ERROR",Config.WIDTH/2,Config.HEIGHT/2);
      break;
      case State.UISTATE_INGAME:
        ctx.textAlign = 'left';
        this.toGameCoords(this.ctx);
          this.drawGrid(this.ctx);
          this.drawGridLabels(this.ctx)
        this.toUICoords(this.ctx);
          Panel.render(this.ctx);
          Queue.render(this.ctx);
          this.drawDebugPanel(this.ctx);
      break;
    }
    
    
  },
  //Put nothing from gamecontext into the reset, it's called before AJAX
  reset:function(ctx){
    ctx.fillStyle = Styles.Colors.black;
    ctx.fillRect(0,0,Config.WIDTH,Config.HEIGHT);
  },
  drawDebugPanel:function(ctx){
    ctx.font = Styles.Fonts.normal;  
    ctx.fillStyle = Styles.Colors.white;

    var now = new Date().getTime();
    var ms = Math.round(1000/(now-State.timeLastFrame));
    if(Config.DEBUG_INFO) {
      ctx.fillText("FPS: "+ms, Config.WIDTH-80, Config.HEIGHT-10);
    }
  },
  drawGrid:function(ctx) {
    for(var idx in GameObjects.Tiles.list)
    {
      GameObjects.Tiles.list[idx].render(ctx);
    }
  },
  drawGridLabels:function(ctx)
  {
    ctx.font      = Styles.Fonts.gridLabel;
    ctx.fillStyle = Styles.Colors.gridLines;

    var ts = Config.TILE_SIZE;
    //X
    for(var i=-Config.GRID_RADIUS;i<=Config.GRID_RADIUS;i++) {
        ctx.fillText(
          Util.displayCoordinate((Player.position.x+i), Config.COORDINATE_DIGITS), 
          -(ts/2)+ts*i + Config.UIGRID_NUMBER_H_OFFSET_X, 
          -(ts/2)-(ts*Config.GRID_RADIUS) + Config.UIGRID_NUMBER_H_OFFSET_Y);
    }
    //Y
    for(var j=-Config.GRID_RADIUS;j<=Config.GRID_RADIUS;j++) {
        ctx.fillText(
          Util.displayCoordinate((Player.position.y+j), Config.COORDINATE_DIGITS), 
          -((ts)*(Config.GRID_RADIUS+1)) + Config.UIGRID_NUMBER_V_OFFSET_X,
          +ts*j + Config.UIGRID_NUMBER_V_OFFSET_Y

          );
    }

  },

  /**
   * These must only be called once and are opposites!
   */
  toGameCoords:function(ctx){
    ctx.save();
    ctx.translate(Config.UIWORLD_WIDTH/2,Config.UIWORLD_HEIGHT/2);
    
    //ctx.scale(State.worldZoom, State.worldZoom);
    //ctx.rotate(State.worldRotation);
  },
  toUICoords:function(ctx){
    //ctx.rotate(-State.worldRotation);
    //ctx.scale(1/State.worldZoom,1/State.worldZoom);
    //ctx.translate(-Config.UIWORLD_WIDTH/2,-Config.UIWORLD_HEIGHT/2);
    ctx.restore();
  }


}