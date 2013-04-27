var GameCanvas={
  obj:null,
  ctx:null,
  pageOffsetLeft:null, //for clickhandling
  pageOffsetTop:null, //for clickhandling
  init:function()
  {
    this.obj = $('#thegame')[0]
    this.obj.width  = Config.WIDTH;
    this.obj.height = Config.HEIGHT;

    //get offsets for proper click handling.
    this.pageOffsetLeft = this.obj.offsetLeft;
    this.pageOffsetTop  = this.obj.offsetTop;
    this.obj.addEventListener('click',
      function(event){ClickHandler.process(event)})

    this.ctx = this.obj.getContext("2d");
    this.ctx.translate(-0.5,-0.5); //cleanup lines

  },
  render:function()
  {
    this.reset(this.ctx);
    this.toGameCoords(this.ctx);
      this.drawGrid(this.ctx);
    this.toUICoords(this.ctx);
      this.drawDebugPanel(this.ctx);
    
  },
  reset:function(ctx){
    ctx.fillStyle = Styles.Colors.black;
    ctx.fillRect(0,0,Config.WIDTH,Config.HEIGHT);
  },
  drawDebugPanel:function(ctx){
    ctx.font = Styles.Fonts.normal;  
    ctx.fillStyle = Styles.Colors.white;

    var now = new Date().getTime();
    var ms=Math.round(1000/(now-State.timeLastFrame));
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
  /**
   * These must only be called once and are opposites!
   */
  toGameCoords:function(ctx){
    ctx.translate(Config.UIWORLD_WIDTH/2,Config.UIWORLD_HEIGHT/2);
    //ctx.scale(State.worldZoom, State.worldZoom);
    //ctx.rotate(State.worldRotation);
  },
  toUICoords:function(ctx){
    //ctx.rotate(-State.worldRotation);
    //ctx.scale(1/State.worldZoom,1/State.worldZoom);
    ctx.translate(-Config.UIWORLD_WIDTH/2,-Config.UIWORLD_HEIGHT/2);
  }


}