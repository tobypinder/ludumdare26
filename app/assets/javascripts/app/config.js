var Config={
  WIDTH:800,
  HEIGHT:600,
  
  TARGET_FPS:30,
  TARGET_MS:null,
  DEBUG_INFO:true,
  /*
   * Doesn't factor Zoom etc. Remember that in order to avoid gaps and render
   * without odd gaps you
   * are gonna need sqrt(SCREENWIDTH^2 + SCREENHEIGHT^2) / size tiles
   * Since the tiles can be rotated.
   */
  TILE_SIZE:50,//
  GRID_RADIUS:5, //-n => n, leaving (2n+1)(2n+1) squares
  UIGRID_NUMBER_H_OFFSET_X:13,
  UIGRID_NUMBER_H_OFFSET_Y:-4,
  UIGRID_NUMBER_V_OFFSET_X:0,
  UIGRID_NUMBER_V_OFFSET_Y:3,
  WORLDBOUNDARY_X:30,
  WORLDBOUNDARY_Y:30,

  UIWORLD_WIDTH:null,
  UIWORLD_HEIGHT:null,    
  COORDINATE_DIGITS:null,
  INIT_WAIT_TICKMS:1000,
  INIT_WAIT_TIMEOUT:10000,
  BLINK_RATE:2000
}

//Later evals
Config.TARGET_MS = 1000/Config.TARGET_FPS
Config.UIWORLD_WIDTH = Config.HEIGHT; //deliberate!
Config.UIWORLD_HEIGHT = Config.HEIGHT
Config.COORDINATE_DIGITS = Config.WORLDBOUNDARY_X.toString().length