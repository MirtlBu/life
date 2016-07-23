(function() {

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var SIZE = 90;
var width;
var life = (function() {
  var arr = [];
  for (var i = 0; i < SIZE; i++) {
    var line = [];
    for (var j = 0; j < SIZE; j++) {
      line.push(Math.random() < .3);
    }
    arr.push(line);
  }
  return arr;
})();

window.addEventListener('resize', onResize);
onResize();


function onResize() {
  width = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = width;
  canvas.width = width;
}

function draw() {
  for (var i = 0; i < SIZE; i++) {
    var line = life[i];
    for (var j = 0; j < SIZE; j++) {
      ctx.fillStyle = line[j] ? '#98be63' : '#2d2d2d';
      ctx.fillRect(
        Math.floor(j * width / SIZE), Math.floor(i * width / SIZE),
        Math.floor(width / SIZE), Math.floor(width / SIZE));
    }
  }
}

function evolve() {
  var nextLife = [];
  for (var i = 0; i < SIZE; i++) {
    var line = life[i];
    var nextLine = [];
    for (var j = 0; j < SIZE; j++) {
      var isLive = line[j];
      var neightbors = countNeighbors(i, j);
      if (isLive) {
        nextLine.push(neightbors === 2 || neightbors === 3);
      } else {
        nextLine.push(neightbors === 3);
      }
    }
    nextLife.push(nextLine);
  }
  life = nextLife;

  function countNeighbors(i, j) {
    var neighbors = 0;
    for (n = i - 1; n <= i + 1; n++) {
      for (m = j - 1; m <= j + 1; m++) {
        if (n === i && m === j) continue;
        neighbors += life[(n + SIZE) % SIZE][(m + SIZE) % SIZE] ? 1 : 0;
      }
    }
    return neighbors;
  }
}

draw();
setInterval(function() {
  evolve();
  draw();
}, 100)

})();
