    var canvas = document.getElementById("picker");
var context = canvas.getContext("2d");
var rangeEl = document.getElementById('range');

function drawPicker() {
  // grab the current ImageData (or use createImageData)
  var bitmap = context.getImageData(0, 0, 150, 150);

  for (var y = 0; y < 150; y++) {
    for (var x = 0; x < 150; x++) {
      // offset for the 4 RGBA values in the data array
      var offset = 4 * ((y * 150) + x);

      var hue = 180 + Math.atan2(y - 75, x - 75) * (180 / Math.PI);
      var saturation = Math.sqrt(Math.pow(y - 75, 2) + Math.pow(x - 75, 2)) / 75;
      var value = rangeEl.value;

      saturation = Math.min(1, saturation);

      var hsv = hsv2rgb(hue, saturation, value);

      // fill RGBA values
      bitmap.data[offset + 0] = hsv[0];
      bitmap.data[offset + 1] = hsv[1];
      bitmap.data[offset + 2] = hsv[2];
      bitmap.data[offset + 3] = 255; // no transparency

    }
  }

  // update the canvas
  context.putImageData(bitmap, 0, 0);
}

// setup
drawPicker();
rangeEl.addEventListener("change", drawPicker);

// =========

function hsv2rgb(h, s, v) {
  var c = v * s;
  var h1 = h / 60;
  var x = c * (1 - Math.abs((h1 % 2) - 1));
  var m = v - c;
  var rgb;

  if (typeof h == 'undefined') rgb = [0, 0, 0];
  else if (h1 < 1) rgb = [c, x, 0];
  else if (h1 < 2) rgb = [x, c, 0];
  else if (h1 < 3) rgb = [0, c, x];
  else if (h1 < 4) rgb = [0, x, c];
  else if (h1 < 5) rgb = [x, 0, c];
  else if (h1 <= 6) rgb = [c, 0, x];

  var r = 255 * (rgb[0] + m);
  var g = 255 * (rgb[1] + m);
  var b = 255 * (rgb[2] + m);

  return [r, g, b];
}



$('#picker').mousemove(function(e) {
    var pos = findPos(this);
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var coord = "x=" + x + ", y=" + y;
    var c = this.getContext('2d');
    var p = c.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
    $('#selected_color').html(coord + "<br>" + hex);
});

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}