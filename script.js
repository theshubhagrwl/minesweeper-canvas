var board = document.getElementById("canvas");
var ctx = board.getContext("2d");

const BOARD_BG = "#8c8c8c";
const BOARD_BORDER = "black";
const CELL_SIZE = 40;
const CELL_BORDER = "white";

var matrix = [];

function main() {
  setDefaultBoard("");
  drawBoard();
}

main();

function setDefaultBoard(value) {
  for (let i = 0; i < 10; i++) {
    matrix.push([]);
    for (let j = 0; j < 10; j++) {
      matrix[i].push(value);
    }
  }
  setMines();
}

function setMines() {
  //setting 10 mines
  for (let i = 0; i < 10; i++) {
    let mineX = Math.floor(Math.random() * 10);
    let mineY = Math.floor(Math.random() * 10);
    matrix[mineX][mineY] = "-1";
  }
  console.log(matrix);
}

function drawBoard() {
  ctx.fillStyle = BOARD_BG;
  ctx.strokeStyle = BOARD_BORDER;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(1, 1, canvas.width, canvas.height);

  for (let i = 0; i < canvas.width; i += CELL_SIZE) {
    for (let j = 0; j < canvas.height; j += CELL_SIZE) {
      ctx.strokeStyle = CELL_BORDER;
      ctx.strokeRect(i, j, CELL_SIZE, CELL_SIZE);
    }
  }
}

function checkAdjMines(x, y) {
  let xCord = x;
  let yCord = y;
  let sum = 0;
  if (matrix[xCord][yCord] == "-1") {
    //game over
  } else {
    if (
      xCord - 1 >= 0 &&
      yCord - 1 >= 0 &&
      matrix[xCord - 1][yCord - 1] == "-1"
    )
      sum++;
    if (yCord - 1 >= 0 && matrix[xCord][yCord - 1] == "-1") sum++;
    if (
      xCord + 1 < 10 &&
      yCord - 1 >= 0 &&
      matrix[xCord + 1][yCord - 1] == "-1"
    )
      sum++;
    if (xCord - 1 >= 0 && matrix[xCord - 1][yCord] == "-1") sum++;
    if (xCord + 1 < 10 && matrix[xCord + 1][yCord] == "-1") sum++;
    if (
      xCord - 1 >= 0 &&
      yCord + 1 < 10 &&
      matrix[xCord - 1][yCord + 1] == "-1"
    )
      sum++;
    if (yCord + 1 < 10 && matrix[xCord][yCord + 1] == "-1") sum++;
    if (
      xCord + 1 < 10 &&
      yCord + 1 < 10 &&
      matrix[xCord + 1][yCord + 1] == "-1"
    )
      sum++;

    ctx.font = "30px cosolas";
    ctx.fillStyle = "green";
    ctx.fillText(sum, x * CELL_SIZE + CELL_SIZE / 2 - 10, y * CELL_SIZE + 30);
    console.log("Text Filled");
  }

  console.log(sum);
}

function getBoxNumber(e) {
  let res = getMousePos(e);
  let x = Math.floor(res.x / CELL_SIZE);
  let y = Math.floor(res.y / CELL_SIZE);
  if (x < 10 && y < 10) {
    // console.log(`x: ${x}, y: ${y}`);
    matrix[x][y] == "-1" ? fillCellOnClick(x, y, true) : fillCellOnClick(x, y);
    checkAdjMines(x, y);
  }
}

function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: Math.round((evt.clientX - rect.left) * scaleX), // scale mouse coordinates after they have
    y: Math.round((evt.clientY - rect.top) * scaleY), // been adjusted to be relative to element
  };
}

function fillCellOnClick(x, y, isMine) {
  let c_x = x * CELL_SIZE;
  let c_y = y * CELL_SIZE;
  isMine ? (ctx.fillStyle = "red") : (ctx.fillStyle = "white");
  //   ctx.strokeStyle = "black";
  ctx.fillRect(c_x, c_y, CELL_SIZE, CELL_SIZE);
  //   ctx.strokeRect(c_x, c_y, CELL_SIZE, CELL_SIZE);
}

document.addEventListener("click", getBoxNumber);
