var Panel={
  init:function()
  {

  },
  render:function(ctx)
  {
    ctx.strokeStyle = Styles.Colors.gridLines;
    ctx.beginPath();
    ctx.rect(
      Config.UIPANEL_X_OFFSET, 
      Config.UIPANEL_Y_OFFSET, 
      Config.UIPANEL_WIDTH, 
      Config.UIPANEL_HEIGHT);
    ctx.stroke();

  }
}