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
    this.load('/api/player/info',null, this.processPlayer);
  },
  moveLeft:function()
  {
    this.load('/api/move/left',null, this.processMovementRequest); 
  },
  moveRight:function()
  {
    this.load('/api/move/right',null, this.processMovementRequest); 
  },
  moveUp:function()
  {
    this.load('/api/move/up',null, this.processMovementRequest); 
  },
  moveDown:function()
  {
    this.load('/api/move/down',null, this.processMovementRequest); 
  },
  moveRest:function()
  {
    this.load('/api/move/rest',null, this.processMovementRequest); 
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
    
    GameIO.load('/api/world', null, GameIO.processWorld);
    
  },
  processWorld:function(evt)
  {
    World.update(evt);
    Tiles.update();
    GameIO.flagWorldRX = true;

  },
  processMovementRequest:function(evt)
  {

  }
}