var GameLoop={
  init:function(){
    setInterval(function(){GameLoop.tick()},Config.TARGET_MS);
  },
  tick:function(){
    State.frameCount++;
    GameCanvas.render();
    State.timeLastFrame = new Date().getTime(); //include ms
  }

}