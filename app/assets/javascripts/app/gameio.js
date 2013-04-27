var GameIO = {
  flagPositionRX:false,

  load: function(target, data, callback) 
  {
    var settings={};
    settings.success  = callback;
    settings.context  = document.body;
    settings.data     = data;
    settings.dataType = 'json';
    settings.fail     = function(){
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
  isReady:function()
  {
    return this.flagPositionRX; //&& other flags
  },
  processPosition:function(evt)
  {
    console.log(evt);
    Player.position = evt.position
    GameIO.flagPositionRX=true;
  }

}