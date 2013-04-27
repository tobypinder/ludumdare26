var Config={
  WIDTH:800,
  HEIGHT:600,
  UIWORLD_WIDTH:null,
  UIWORLD_HEIGHT:null,  
  TARGET_FPS:30,
  TARGET_MS:null,
  DEBUG_INFO:true,
  /*
   * Doesn't factor Zoom etc. Remember that in order to avoid gaps and render
   * without odd gaps you
   * are gonna need sqrt(SCREENWIDTH^2 + SCREENHEIGHT^2) / size tiles
   * Since the tiles can be rotated.
   */
  TILE_SIZE:50//

}
//Later evals
Config.TARGET_MS = 1000/Config.TARGET_FPS
Config.UIWORLD_WIDTH = Config.HEIGHT; //deliberate!
Config.UIWORLD_HEIGHT = Config.HEIGHT