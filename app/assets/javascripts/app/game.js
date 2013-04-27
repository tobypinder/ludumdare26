var Game = {

  start:function()
  {
    GameCanvas.init();
    GameObjects.init();
    GameIO.getInitialData();
    Game.startLoop();
  },
  startLoop:function()
  {
    if(GameIO.isReady()) {
      GameLoop.init();
    } else 
    {
      console.log("Not ready... "+State.initIOWait);
      State.initIOWait += Config.INIT_WAIT_TICKMS;
      if(State.initIOWait < Config.INIT_WAIT_TIMEOUT)
      {
        setTimeout(function(){Game.startLoop()},Config.INIT_RETRY_MS);
      }
    }

  }
}



