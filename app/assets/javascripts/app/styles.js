var Styles = {
  Colors:null,
  Fonts:null,
  LineWidth:null
}

Styles.Colors = {
  black: '#000000',
  white: '#ffffff',
  gridLines: '#003300',
  characterTile: '#333300',
  withinRangeTile: '#111100',
  impassableTile: '#222222',
  impassableGrid: '#333333',
  selected: '#003300', //'rgba(0,20,0,0.2)'
  blinkRed:function(){
    var a = (new Date().getTime() % Config.BLINK_RATE) / Config.BLINK_RATE
    return "rgb("+Math.round(Math.sin(Math.PI*a)*82+20)+",0,0)"
  },
  blinkGreen:function(){
    var a = (new Date().getTime() % Config.BLINK_RATE) / Config.BLINK_RATE
    return "rgb(0,"+Math.round(Math.sin(Math.PI*a)*82+20)+",0)"
  }
}

Styles.Fonts = {
  normal:     "bold 18px Electrolizeregular",
  gridLabel:  "bold 11px Electrolizeregular",
  hugeBanner: "bold 96px Electrolizeregular" 
}

Styles.LineWidth={
  thick:5,
  thin:1
}