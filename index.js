(function() {

var canvas = document.getElementsByTagName('canvas')[0];


window.addEventListener('resize', onResize);
onResize();

function onResize() {
  var size = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = size;
  canvas.width = size;
}

})();
