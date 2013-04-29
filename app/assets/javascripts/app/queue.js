var Queue={
  data:[],
  update:function(raw,inSubElement)
  {
    inSubElement = typeof inSubElement !== 'undefined' ? inSubElement : false;
    Queue.data = []
    for(var i=0;i<raw.length;i++) 
    { 
      if(inSubElement) {
        Queue.data.push(raw[i].queued_item);
      } else {
        Queue.data.push(raw[i]);
      }
    }
    Queue.updateTrail();
  },
  getName:function(action)
  {
    switch(action)
    {
      case 'move_left':
        return 'LEFT'
      break;
      case 'move_right':
        return 'RIGHT'
      break;
      case 'move_up':
        return 'UP'
      break;
      case 'move_down':
        return 'DOWN'
      break;
      case 'move_rest':
        return 'REST'
      break;
      default:
        return '???';
      break;
    }
  },

  updateTrail:function(){
    slugX=0;
    slugY=0;
    GameObjects.Slug.list=[];
    for(var i=0;i<Queue.data.length;i++)
    {
      var skip=false;
      switch(Queue.data[i].action)
      {
        case 'move_left':
          slugX--;
        break;
        case 'move_right':
          slugX++;
        break;
        case 'move_up':
          slugY--;
        break;
        case 'move_down':
          slugY++;
        break;
        default:
          skip=true;
        break
      }

      GameObjects.Slug.list.push({x:slugX,y:slugY})

    }
  },

  render:function(ctx){

    //arrow
    ctx.lineWidth = Styles.LineWidth.thin;
    ctx.strokeStyle = Styles.Colors.queueGridLines;
    ctx.fillStyle = Styles.Colors.queueText;
    ctx.beginPath();
    ctx.moveTo(
      Config.UIQUEUE_X_OFFSET - 20, 
      Config.UIQUEUE_Y_OFFSET + Config.UIQUEUE_HEIGHT 
    );
    ctx.lineTo(
      Config.UIQUEUE_X_OFFSET - 20, 
      Config.UIQUEUE_Y_OFFSET
    );
    ctx.lineTo(
      Config.UIQUEUE_X_OFFSET - 10, 
      Config.UIQUEUE_Y_OFFSET + (Config.UIQUEUE_HEIGHT /2) 
    );
    ctx.stroke();
    ctx.fill();
    
    ctx.textAlign = 'right';

    ctx.fillText(
      'NEXT',
       Config.UIQUEUE_X_OFFSET - 30, 
       Config.UIQUEUE_Y_OFFSET + Config.UIQUEUE_LABEL_Y_OFFSET
    )

    ctx.textAlign = 'center';
    for(var i=0;i<Player.maxQP;i++)
    {
      ctx.lineWidth = Styles.LineWidth.thin;
      ctx.strokeStyle = Styles.Colors.queueGridLines;

      if(Queue.data.length>i) {
        ctx.fillStyle = Styles.Colors.queueFill;
      } else {
        ctx.fillStyle = Styles.Colors.black;
      }

      ctx.beginPath();
      ctx.rect(
        Config.UIQUEUE_X_OFFSET, 
        Config.UIQUEUE_Y_OFFSET - (Config.UIQUEUE_SPACER*i), 
        Config.UIQUEUE_WIDTH, 
        Config.UIQUEUE_HEIGHT  
      );
      ctx.stroke();
      ctx.fill();
      ctx.fillStyle = Styles.Colors.queueText;
      if(Queue.data.length>i) {
        ctx.fillText(
          Queue.getName(Queue.data[i].action),
          Config.UIQUEUE_X_OFFSET + (Config.UIQUEUE_WIDTH/2), 
          Config.UIQUEUE_Y_OFFSET + Config.UIQUEUE_LABEL_Y_OFFSET - (Config.UIQUEUE_SPACER*i) 
        )
      }
     
    }
  }
}