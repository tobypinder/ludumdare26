var Panel={
  
  buttonGoLeft:{},
  buttonGoRight:{},
  buttonGoUp:{},
  buttonGoDown:{},
  buttonRest:{},
  init:function()
  {

    this.initButton(
      this.buttonGoUp,
      Config.UIPANELCONTROL_X_OFFSET + Config.TILE_SIZE,
      Config.UIPANELCONTROL_Y_OFFSET,
      'Up',
      function(){GameIO.moveUp()}
    )

    this.initButton(
      this.buttonGoDown,
      Config.UIPANELCONTROL_X_OFFSET + Config.TILE_SIZE,
      Config.UIPANELCONTROL_Y_OFFSET + 2*Config.TILE_SIZE,
      'Down',
      function(){GameIO.moveDown()}
    )
    
    this.initButton(
      this.buttonGoLeft,
      Config.UIPANELCONTROL_X_OFFSET ,
       Config.UIPANELCONTROL_Y_OFFSET + Config.TILE_SIZE,
      'Left',
      function(){GameIO.moveLeft()}
    )

    this.initButton(
      this.buttonGoRight,
      Config.UIPANELCONTROL_X_OFFSET + 2*Config.TILE_SIZE,
      Config.UIPANELCONTROL_Y_OFFSET + Config.TILE_SIZE,
      'Right',
      function(){GameIO.moveRight()}
    )

    this.initButton(
      this.buttonRest,
      Config.UIPANELCONTROL_X_OFFSET + Config.TILE_SIZE,
      Config.UIPANELCONTROL_Y_OFFSET + Config.TILE_SIZE,
      'Rest',
      function(){GameIO.moveRest()}
    )

  },
  initButton:function(obj,ui_x,ui_y,text,event_click){
    obj.ui_x = ui_x;
    obj.ui_y = ui_y;
    obj.ui_w = Config.TILE_SIZE;
    obj.ui_h = Config.TILE_SIZE;
    obj.coords = Config.COORDS_UI;
    obj.text = text; //nonstandard used later.
    obj.event_click = function(){event_click()}
    ClickHandler.add(obj);
  },

  render:function(ctx)
  {
    ctx.lineWidth = Styles.LineWidth.thin;
    ctx.strokeStyle = Styles.Colors.panelGridLines;
    ctx.beginPath();
    ctx.rect(
      Config.UIPANEL_X_OFFSET, 
      Config.UIPANEL_Y_OFFSET, 
      Config.UIPANEL_WIDTH, 
      Config.UIPANEL_HEIGHT);
    ctx.stroke();

    //label
    ctx.textAlign = 'center';
    ctx.font      = Styles.Fonts.controlsTitle;
    ctx.fillStyle = Styles.Colors.controlsLabel;
    ctx.fillText(
      "Add Turn Actions",
      Config.UIPANELCONTROL_X_OFFSET+(1.5*Config.TILE_SIZE),
      Config.UIPANELCONTROL_Y_OFFSET-Config.UIPANELCONTROL_LABEL_Y_OFFSET
    );
    

    //directionals
    this.renderButtons(ctx);
    this.renderClock(ctx);
  },
  renderButtons:function(ctx)
  {




    ctx.strokeStyle = Styles.Colors.buttonGridLines;
    ctx.fillStyle   = Styles.Colors.buttonFill;

    ctx.beginPath();
    ctx.rect(
      Config.UIPANELCONTROL_X_OFFSET, 
      Config.UIPANELCONTROL_Y_OFFSET, 
      Config.UIPANELCONTROL_WIDTH,//Config.TILE_SIZE*3, 
      Config.UIPANELCONTROL_HEIGHT//Config.TILE_SIZE*3
    );
    ctx.stroke();

    

    this.renderButton(ctx, this.buttonGoLeft);
    this.renderButton(ctx, this.buttonGoRight);
    this.renderButton(ctx, this.buttonGoUp);
    this.renderButton(ctx, this.buttonGoDown);
    this.renderButton(ctx, this.buttonRest);
    ctx.fillStyle   = Styles.Colors.black;
  },
  renderButton:function(ctx, obj)  
  {
    ctx.strokeStyle = Styles.Colors.buttonGridLines;
    ctx.fillStyle   = Styles.Colors.buttonFill;
    ctx.textAlign   = 'center'

    ctx.beginPath();
    ctx.rect(
      obj.ui_x, 
      obj.ui_y,
      obj.ui_w,
      obj.ui_h
    );
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle   = Styles.Colors.buttonLabel;

    ctx.fillText(
      obj.text,
      obj.ui_x+(obj.ui_w/2),
      obj.ui_y+(obj.ui_h/2)+Config.UIBUTTON_OFFSET_Y
    )

  },
  renderClock:function(ctx)
  {
    
    //assume semi circle for now.
    var now = new Date().getTime();
    var arcPercent = 1-(now - State.clockInitTime)/State.clockTotalTime

    //var arcPercent=1 - ((State.frameCount % 300)/300);

    ctx.fillStyle   = Styles.Colors.clockBG;
    ctx.beginPath();
    ctx.moveTo(Config.UICLOCK_MIDPOINT_X,Config.UICLOCK_MIDPOINT_Y);
    ctx.arc(
      Config.UICLOCK_MIDPOINT_X,
      Config.UICLOCK_MIDPOINT_Y,
      Config.UICLOCK_RADIUS_BIG,
      0,
      Math.PI*2,
      false
    );
    ctx.lineTo(Config.UICLOCK_MIDPOINT_X,Config.UICLOCK_MIDPOINT_Y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle   = Styles.Colors.clockFG;
    ctx.beginPath();
    ctx.moveTo(Config.UICLOCK_MIDPOINT_X,Config.UICLOCK_MIDPOINT_Y);
    ctx.arc(
      Config.UICLOCK_MIDPOINT_X,
      Config.UICLOCK_MIDPOINT_Y,
      Config.UICLOCK_RADIUS,
      -(0.5*Math.PI),
      (Math.PI*2*arcPercent)-(0.5*Math.PI),
      false
    );
    ctx.lineTo(Config.UICLOCK_MIDPOINT_X,Config.UICLOCK_MIDPOINT_Y);
    ctx.closePath();
    ctx.fill();
  }
}