var GameIO = {
  flagPositionRX:false,
  flagWorldRX:false,
  isReady:function()
  {
    return (
        this.flagPositionRX &&
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
    //WE NEED TO "BLOCK" ON THE RESULTS OF THESE AS WITHOUT THE INITIAL STATE, THE 
    //GAME CAN DO NOTHING!
    this.load('/api/current_position',null, this.processPosition);
    

  },
  processPosition:function(evt)
  {
    Player.position = evt.position
    GameIO.flagWorldRX = true;
    GameIO.load('/api/world', null, GameIO.processWorld);
    
  },
  processWorld:function(evt)
  {
    World.update(evt);
    Tiles.update();
    GameIO.flagPositionRX = true;

  }
}