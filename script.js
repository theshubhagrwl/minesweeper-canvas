var board = document.getElementById("canvas");
var ctx = board.getContext("2d");

const BOARD_BG = "#8c8c8c";
const BOARD_BORDER = "black";
const BOX_SIZE = 40;
const CELL_BORDER = "white";

function drawBaord() {
  ctx.fillStyle = BOARD_BG;
  ctx.strokeStyle = BOARD_BORDER;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(1, 1, canvas.width, canvas.height);

  for (let i = 0; i < canvas.width; i += BOX_SIZE) {
    for (let j = 0; j < canvas.height; j += BOX_SIZE) {
      ctx.strokeStyle = CELL_BORDER;
      ctx.strokeRect(i, j, BOX_SIZE, BOX_SIZE);
    }
  }
}

function getBoxNumber() {}

drawBaord();
