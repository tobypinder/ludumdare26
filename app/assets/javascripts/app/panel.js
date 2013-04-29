var Panel={
  
  buttonGoLeft:{},
  buttonGoRight:{},
  buttonGoUp:{},
  buttonGoDown:{},
  buttonRest:{},
  init:function()
  {
    this.initButtons();
  },
  initButtons:function()
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
    //directionals
    this.renderButtons(ctx);
    this.renderClock(ctx);
    this.renderStats(ctx);
    this.renderTileInspector(ctx);
  },
  renderButtons:function(ctx)
  {

    //control panel/text
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

    //buttons
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
  },
  renderStats:function(ctx)
  {
      
      ctx.fillStyle = Styles.Colors.controlsLabel;
      
      //PLAYER name
      ctx.font      = Styles.Fonts.statsLabel;
      ctx.textAlign = 'center';
      ctx.fillText(
        Player.username.toUpperCase(),
        Config.UISTATS_X_OFFSET+(Config.UISTATS_WIDTH/2),
        Config.UISTATS_Y_OFFSET
      );

      //
      // HP BAR
      //
      ctx.fillStyle = Styles.Colors.HP_BG;
      
      ctx.beginPath();
      ctx.rect(
        Config.UISTATS_X_OFFSET, 
        Config.UISTATS_Y_OFFSET+4, 
        Config.UISTATS_WIDTH, 
        Config.UISTATS_HEIGHT-4);
      ctx.fill();

      var hpWidth = Player.HP / Player.maxHP
      ctx.fillStyle = Styles.Colors.HP_FG;
      ctx.beginPath();
      ctx.rect(
        Config.UISTATS_X_OFFSET, 
        Config.UISTATS_Y_OFFSET+4, 
       (Config.UISTATS_WIDTH * hpWidth), 
        Config.UISTATS_HEIGHT-4);
      ctx.fill();

      ctx.fillStyle = Styles.Colors.controlsLabel;
      //
      // Labels
      //
      ctx.font      = Styles.Fonts.statsLabel;
      ctx.textAlign = 'left';

      //HP
      
      ctx.fillText(
        "HP:",
        Config.UISTATS_X_OFFSET,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*2)
      );

      //Regen
      ctx.fillText(
        "Regen:",
        Config.UISTATS_X_OFFSET,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*3)
      );

      //Attack
      ctx.fillText(
        "Atk:",
        Config.UISTATS_X_OFFSET,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*4)
      );

      //Attack
      ctx.fillText(
        "Def:",
        Config.UISTATS_X_OFFSET,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*5)
      );

      //
      // Vals
      //

      ctx.font      = Styles.Fonts.statsValue;
      ctx.textAlign = 'right';

      //HP
      ctx.fillText(
        Player.HP+" / "+Player.maxHP,
        Config.UISTATS_X_OFFSET+Config.UISTATS_WIDTH,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*2)
      );

      //Regen
      ctx.fillText(
        Player.regenHP + " pts/turn",
        Config.UISTATS_X_OFFSET+Config.UISTATS_WIDTH,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*3)
      );

      //Atk
      ctx.fillText(
        Player.attack + " pts",
        Config.UISTATS_X_OFFSET+Config.UISTATS_WIDTH,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*4)
      );

      //Def
      ctx.fillText(
        Player.defence + " pts",
        Config.UISTATS_X_OFFSET+Config.UISTATS_WIDTH,
        Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*5)
      );
  },
  renderTileInspector:function(ctx)
  {
    ctx.font      = Styles.Fonts.statsValue;
    ctx.textAlign = 'center';
    
    //TITLE
    ctx.fillText(
      "Tile Contents:",
      Config.UISTATS_X_OFFSET+(0.5*Config.UISTATS_WIDTH),
      Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*6.5)
    );   

    //get both allies and enemies at selected tile.

    var objs = World.getTileObjects(State.selectedTile_X,State.selectedTile_Y);
    for(var i=0;i<objs.length;i++)
    {
      this.renderInspection(i,objs[i],ctx)
    }
   

    //#for(i=0;i<12;i++)
    //#{
    //#  ctx.beginPath();
    //#  ctx.rect(
    //#    Config.UISTATS_X_OFFSET+10, 
    //#    Config.UISTATS_Y_OFFSET+(Config.UISTATS_HEIGHT*(vIndex+i)), 
    //#    Config.UISTATS_WIDTH-20, 
    //#    (Config.UISTATS_HEIGHT*1)
    //#  );
    //#  ctx.stroke();
    //#} 
  },
  renderInspection:function(idx,data,ctx)
  {
    var obj=data.obj;
    //console.log(obj)

    if(data.type=='enemy')
    {
      ctx.strokeStyle = Styles.Colors.inspectEnemy;
      ctx.fillStyle = Styles.Colors.inspectEnemy;
    }
    if(data.type=='player')
    {
      ctx.strokeStyle = Styles.Colors.inspectPlayer;
      ctx.fillStyle = Styles.Colors.inspectPlayer;
    }

    ctx.beginPath();
    ctx.rect(
      Config.UISTATS_X_OFFSET-2, 
      Config.UIINSPECT_OFFSET_Y + (Config.UIINSPECT_PAD*(idx)), 
      Config.UISTATS_WIDTH+4, 
      Config.UIINSPECT_HEIGHT
    );
    ctx.stroke();

    var name = (data.type=='player') ? obj.username : obj.name

    ctx.textAlign = 'left';
     ctx.beginPath();
    ctx.fillText(
      name,
      Config.UISTATS_X_OFFSET,
      Config.UIINSPECT_OFFSET_Y + (Config.UIINSPECT_PAD*idx) + 2*Config.UIINSPECT_INTERNAL_Y
    );   

    var HPdisplay = (data.type=='player') ? (obj.HP+"/"+obj.maxHP) : obj.HP

    ctx.textAlign = 'right';
    ctx.beginPath();
    ctx.fillText(
      HPdisplay,
      Config.UISTATS_X_OFFSET+(1*Config.UISTATS_WIDTH),
      Config.UIINSPECT_OFFSET_Y+(Config.UIINSPECT_PAD*idx) + 4*Config.UIINSPECT_INTERNAL_Y
    );   
  }
}