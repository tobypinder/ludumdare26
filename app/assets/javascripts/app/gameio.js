var GameIO = {
  flagPlayerRX:false,
  flagWorldRX:false,
  isReady:function()
  {
    return (
        this.flagPlayerRX &&
        this.flagWorldRX
    );
  },

  load: function(target, data, callback) 
  {
    var settings = {};
    settings.success  = callback;
    settings.context  = document.body;
    settings.data     = data;
    settings.dataType = 'json';
    settings.error    = function(){
                          //Seamless graceful failure (NOT)
                          State.uiState = State.UISTATE_ERROR;
                          console.log("Something Went Wrong with AJAX to "+target+" with data "+data)
                        }
    settings.type     = 'GET'                    
    $.ajax(target+'.json', settings);
  },
  getInitialData: function()
  {
    GameIO.load('/api/player/info',null, GameIO.processPlayer);
  },

  getPlayerData: function()
  {
    GameIO.load('/api/player/info',null, GameIO.processPlayer);
  },


  moveLeft:function()
  {
    GameIO.load('/api/move/left',null, GameIO.processMovementRequest); 
  },
  moveRight:function()
  {
    GameIO.load('/api/move/right',null, GameIO.processMovementRequest); 
  },
  moveUp:function()
  {
    GameIO.load('/api/move/up',null, GameIO.processMovementRequest); 
  },
  moveDown:function()
  {
    GameIO.load('/api/move/down',null, GameIO.processMovementRequest); 
  },
  moveRest:function()
  {
    GameIO.load('/api/move/rest',null, GameIO.processMovementRequest); 
  },  
  //HANDLERS
  processPlayer:function(evt)
  {
    GameIO.flagPlayerRX = true;
    
    var p = evt.user

    Player.username = p.username
    Player.HP       = p.HP
    Player.maxHP    = p.maxHP
    Player.maxQP    = p.maxQP
    Player.regenHP  = p.regenHP
    Player.attack   = p.attack
    Player.defence  = p.defence
    Player.exp      = p.exp
    Player.position = p.position
    Queue.update(p.queued_items,false);
    GameIO.load('/api/world', null, GameIO.processWorld);
    
    //get player data for the next turn.
    var nextTurnSeconds = (p.game_rules.lastTick + p.game_rules.tickRate) - p.game_rules.now
    var nextTurnMS = (nextTurnSeconds*1000)+Config.AJAX_WAIT_TIME
    console.log("Reloading Data in "+nextTurnMS+" milliseconds!");
    State.clockTotalTime  = nextTurnMS
    State.clockInitTime   = new Date().getTime();


    setTimeout(GameIO.getPlayerData, nextTurnMS);
  },
  processWorld:function(evt)
  {
    World.update(evt);
    Tiles.update();
    GameIO.flagWorldRX = true;

  },
  processMovementRequest:function(evt)
  {
    Queue.update(evt,true);
    GameIO.load('/api/world', null, GameIO.processWorld);
  }
}