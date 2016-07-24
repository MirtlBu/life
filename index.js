(function() {

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var SIZE = 90;
var width;
var life = newLife(true);
var extraLife = newLife();

function newLife(rand) {
  var arr = new Array(SIZE);
  for (var i = 0; i < SIZE; i++) {
    var line = new Array(SIZE);
    for (var j = 0; j < SIZE; j++) {
      line[j] = rand && (Math.random() < .2);
    }
    arr[i] = line;
  }
  return arr;
};

window.addEventListener('resize', onResize);
onResize();

function onResize() {
  width = Math.min(window.innerHeight, window.innerWidth);
  canvas.height = width;
  canvas.width = width;
  drawGeneration();
}

function drawCell(i, j, isLive) {
  var x1 = Math.floor(j * width / SIZE);
  var y1 = Math.floor(i * width / SIZE);
  var x2 = Math.floor((j + 1) * width / SIZE) - 1;
  var y2 = Math.floor((i + 1) * width / SIZE) - 1;
  ctx.fillStyle = isLive ? '#98be63' : '#2d2d2d';
  ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
}

function drawGeneration() {
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
      drawCell(i, j, life[i][j]);
    }
  }
}

function liveGeneration() {
  for (var i = 0; i < SIZE; i++) {
    var line = life[i];
    var extraLine = extraLife[i];
    for (var j = 0; j < SIZE; j++) {
      var neightbors = countNeighbors(i, j);
      extraLine[j] = neightbors === 3 || (line[j] && neightbors === 2);
      if (line[j] !== extraLine[j]) {
        drawCell(i, j, extraLine[j]);
      }
    }
  }

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

  var _ = extraLife;
  extraLife = life;
  life = _;
}

var prev;
requestAnimationFrame(function(time) {
  prev = time;
  requestAnimationFrame(draw);
});

function draw(time) {
  var progress = time - prev;
  if (progress > 100) {
    prev = time - progress % 100;
    liveGeneration();
  }
  requestAnimationFrame(draw);
}

})();
