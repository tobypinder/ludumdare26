var Game = {

  start:function()
  {
    GameCanvas.init();
    GameObjects.init();
    GameIO.getInitialData();
    GameLoop.init();
    Game.isStateReady();
  },
  isStateReady:function()
  {
    if(GameIO.isReady()) 
    {
      State.uiState = State.INGAME 
    } else {
      console.log("Not ready... "+State.initIOWait);
      State.initIOWait += Config.INIT_WAIT_TICKMS;
      if(State.initIOWait < Config.INIT_WAIT_TIMEOUT)
      {
        setTimeout(function(){Game.isStateReady()},Config.INIT_WAIT_TICKMS);
      } else {
        State.uiState = State.UISTATE_ERROR 
      }
    }

  }
}



