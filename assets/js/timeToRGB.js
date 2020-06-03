// {{{ Clock related content

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

  document.getElementById("clock").innerHTML = curTime;
}

// }}}

// {{{ Color related content

// rescale 0-n to 0-240 for use with rgb
function scaleColor(x,n) { return Math.floor(x * 240 / n) }


// naievely treat hh:mm:ss as r:g:b
// this leads to weird discontinuities on the 59-00 boundaries
function classicColor()
{
  var now = new Date();

  var hh = scaleColor(now.getHours(),   24);
  var mm = scaleColor(now.getMinutes(), 60);
  var ss = scaleColor(now.getSeconds(), 60);

  return "rgb(" + hh + "," + mm + "," + ss +")";
}

// treat hh:mm:ss as rgb, but alternate counting up/down to make it continuous
function modernColor()
{
  var now = new Date();

  var hh = now.getHours();
  var mm = now.getMinutes();
  var ss = now.getSeconds();
  
  // To make it smooth when hours roll over too, 
  // we increase from 0-11 and decrease from 12-00
  var r = hh < 12     ? scaleColor(hh, 12) : (240 - scaleColor(hh-12, 12));
  var g = hh % 2 == 0 ? scaleColor(mm, 60) : (240 - scaleColor(mm,    60));
  var b = mm % 2 == 0 ? scaleColor(ss, 60) : (240 - scaleColor(ss,    60));

  return "rgb(" + r + "," + g + "," + b + ")";
}

function updateColor()
{
  rgbString = document.getElementById("modern").checked ? modernColor() : classicColor();

  document.getElementById("background").style.background = rgbString;
}

// }}}

function update()
{
  updateClock();
  updateColor();
}
