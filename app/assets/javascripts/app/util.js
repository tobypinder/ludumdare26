var Util={
  displayCoordinate:function(val,target){
    val=val.toString();
    while(val.length <= target)
    {
      //add a char taking care to avoid - sign.
      if(val[0]=='-') {
        val = val.splice(1,0,'0');
      } else {
        if(val.length==target)
        {
          val = val.splice(0,0,' ');
        } else {
          val = val.splice(0,0,'0');
        }
      }
    }
    return val;
  }


}

//And now for the ugly stuff

//http://stackoverflow.com/questions/4313841/javascript-how-can-i-insert-a-string-at-a-specific-index

String.prototype.splice = function( idx, rem, s ) {
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};
