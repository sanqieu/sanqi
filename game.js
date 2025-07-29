const size = 15, grid = 30, radius = 12;
let board = [], gameOn = false, black = [], white = [];

function drawBoard(ctx) {
  ctx.clearRect(0, 0, 450, 450);
  ctx.strokeStyle = "#333";
  for (let i = 0; i < size; i++) {
    ctx.beginPath();
    ctx.moveTo(grid/2, grid/2 + i*grid);
    ctx.lineTo(grid/2 + (size-1)*grid, grid/2 + i*grid);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(grid/2 + i*grid, grid/2);
    ctx.lineTo(grid/2 + i*grid, grid/2 + (size-1)*grid);
    ctx.stroke();
  }
}

function resetGame() {
  board = Array(size*size).fill(0);
  black = [];
  white = [];
}

function idx(x, y) { return y*size + x; }

function checkWin(list, xi, yi) {
  const dirs = [[1,0],[0,1],[1,1],[1,-1]];
  for (let [dx,dy] of dirs) {
    let cnt = 1;
    for (let d=1;d<=4;d++)
      if (list.includes(idx(xi+dx*d, yi+dy*d))) cnt++; else break;
    for (let d=1;d<=4;d++)
      if (list.includes(idx(xi-dx*d, yi-dy*d))) cnt++; else break;
    if (cnt>=5) return true;
  }
  return false;
}

document.getElementById('startBtn').onclick = () => {
  gameOn = true; resetGame();
  document.getElementById('menu').style.display = 'none';
  const cv = document.getElementById('board');
  cv.style.display = 'block';
  let ctx = cv.getContext('2d');
  drawBoard(ctx);

  cv.oncontextmenu = () => false;
  cv.onmousedown = (e) => {
    if (!gameOn) return;
    let rect = cv.getBoundingClientRect();
    let x = Math.round((e.clientX - rect.left - grid/2)/grid);
    let y = Math.round((e.clientY - rect.top - grid/2)/grid);
    let i = idx(x,y);
    if (x<0||x>=size||y<0||y>=size||board[i]) return;

    if (e.button===0) { // ◊Ûº¸->∫⁄
      ctx.beginPath();
      ctx.arc(grid/2 + x*grid, grid/2 + y*grid, radius, 0, 2*Math.PI);
      ctx.fillStyle = "black"; ctx.fill();
      board[i]=1; black.push(i);
      if (checkWin(black,x,y)) { 
        gameOn=false; setTimeout(()=>alert("∫⁄∑Ω §!"),100);
      }
    } else if (e.button===2) { // ”“º¸->∞◊
      ctx.beginPath();
      ctx.arc(grid/2 + x*grid, grid/2 + y*grid, radius, 0, 2*Math.PI);
      ctx.fillStyle = "white"; ctx.fill();
      board[i]=2; white.push(i);
      if (checkWin(white,x,y)) { 
        gameOn=false; setTimeout(()=>alert("∞◊∑Ω §!"),100);
      }
    }
  };
};

document.getElementById('quitBtn').onclick = () => {
  // πÿ±’“≥√ÊªÚ∑µªÿ≤Àµ•
  document.getElementById('board').style.display = 'none';
  document.getElementById('menu').style.display = 'block';
  gameOn = false;
};