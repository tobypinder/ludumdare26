var Panel={
  init:function()
  {

  },
  render:function(ctx)
  {
    ctx.strokeStyle = Styles.Colors.gridLines;
    ctx.beginPath();
    ctx.rect(
      600, 
      25, 
      175, 
      550);
    ctx.stroke();

  }
}