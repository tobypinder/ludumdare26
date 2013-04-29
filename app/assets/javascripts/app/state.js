var State={

  UISTATE_LOADING:1,
  UISTATE_IN_GAME:2,
  UISTATE_ERROR:3,
  uiState:1,

  frameCount:0, //debuggey fun stuff.

  timeLastFrame:null,
  worldZoom:1,
  worldRotation:0,
  initIOWait:0, //time waited before game init

  clockTotalTime:0,
  clockElapsedTime:0,
  clockInitTime:0,

  selectedTile_X:0,
  selectedTile_Y:0
}