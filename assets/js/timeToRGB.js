// pad out 1 digit numbers by 0s
function padWithZeros(s) { return (s < 10 ? "0" : "") + s; }

function get12H()
{
  var now = new Date();
  var hh = now.getHours();
  var mm = padWithZeros(now.getMinutes());
  var ss = padWithZeros(now.getSeconds());

  var ampm = hh < 12 ? "AM" : "PM";

  // subtract 12 from PM times, but turn 0 into 12.
  var hh = hh > 12 ? hh - 12 : (hh == 0 ? 12 : hh);

  return hh + ":" + mm + ":" + ss + " " + ampm;
}

function get24H()
{
  var now = new Date();
  var hh = now.getHours();
  var mm = padWithZeros(now.getMinutes());
  var ss = padWithZeros(now.getSeconds());

  return hh + ":" + mm + ":" + ss;
}

function updateClock()
{
  var curTime = document.getElementById("24H").checked ? get24H() : get12H();

  document.getElementById('clock').innerHTML = curTime;
}

// rescale 0-n to 0-240 for use with rgb
// n will be 60 for mins and secs, and will be 24 for hours
// we use 240 to make everything integral, as well as prevent white on white
function scaleColor(x,n) { return Math.floor(x * 240 / n) }

function updateColor()
{
  var now = new Date();

  var hh = scaleColor(now.getHours(),   24);
  var mm = scaleColor(now.getMinutes(), 60);
  var ss = scaleColor(now.getSeconds(), 60);

  var rgbString = "rgb(" + hh + "," + mm + "," + ss +")";

  document.getElementById("clock").style.color = rgbString;
}

function update()
{
  updateClock();
  updateColor();
}