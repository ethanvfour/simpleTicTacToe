const game = {
  turn: true, //if true, X turn, O otherwise
  gameDone: false,
  OWon: false,
  XWon: false,
  tie: false,
  times: 0,
};

const checkWin = function () {
  if (game.times < 5) return false;
  const xStr = "images/X.png";
  const oStr = "images/O.png";
  let cells = document.querySelectorAll("#grid li");
  /*
  1 2 3
  4 5 6
  7 8 9
  */
  for (
    let i = 1;
    i < 9;
    i = i + 3 //horizontal
  ) {
    let getOnesToBeChecked = [];
    let xWon = true,
      oWon = true;
    for (let j = i; j < i + 3; j++)
      getOnesToBeChecked.push(document.querySelector(`.cell0${j}`));
    getOnesToBeChecked.forEach((cell) => {
      let imgObj = document.querySelector(
        `.${cell.getAttribute("class").split(" ")[1]} img`
      );
      if (imgObj.getAttribute("src") === "") xWon = oWon = false;
      if (imgObj.getAttribute("src") === xStr) oWon = false;
      if (imgObj.getAttribute("src") === oStr) xWon = false;
    });
    if (xWon || oWon) {
      game.OWon = oWon;
      game.XWon = xWon;
      return true;
    }
  }

  for (
    let i = 1;
    i < 4;
    i++ //vertical
  ) {
    let getOnesToBeChecked = [];
    let xWon = true,
      oWon = true;
    for (let j = i; j < 10; j = j + 3)
      getOnesToBeChecked.push(document.querySelector(`.cell0${j}`));
    getOnesToBeChecked.forEach((cell) => {
      let imgObj = document.querySelector(
        `.${cell.getAttribute("class").split(" ")[1]} img`
      );
      if (imgObj.getAttribute("src") === "") xWon = oWon = false;
      if (imgObj.getAttribute("src") === xStr) oWon = false;
      if (imgObj.getAttribute("src") === oStr) xWon = false;
    });
    if (xWon || oWon) {
      game.OWon = oWon;
      game.XWon = xWon;
      return true;
    }
  }

  let ltrCross = [],
    rtlCross = [];
  for (
    let i = 1, j = 3;
    i < 10;
    i = i + 4, j = j + 2 //i know...
  ) {
    ltrCross.push(document.querySelector(`.cell0${i}`));
    rtlCross.push(document.querySelector(`.cell0${j}`));
  }
  let xWon = true,
    oWon = true;
  for (let i = 0; i < 3; i++) {
    let imgObj = document.querySelector(
      `.${ltrCross[i].getAttribute("class").split(" ")[1]} img`
    );
    if (imgObj.getAttribute("src") === "") xWon = oWon = false;
    if (imgObj.getAttribute("src") === xStr) oWon = false;
    if (imgObj.getAttribute("src") === oStr) xWon = false;
  }
  if (xWon || oWon) {
    game.OWon = oWon;
    game.XWon = xWon;
    return true;
  }
  (xWon = true), (oWon = true);
  for (let i = 0; i < 3; i++) {
    let imgObj = document.querySelector(
      `.${rtlCross[i].getAttribute("class").split(" ")[1]} img`
    );
    if (imgObj.getAttribute("src") === "") xWon = oWon = false;
    if (imgObj.getAttribute("src") === xStr) oWon = false;
    if (imgObj.getAttribute("src") === oStr) xWon = false;
  }
  if (xWon || oWon) {
    game.OWon = oWon;
    game.XWon = xWon;
    return true;
  }
  if (game.times === 9) {
    game.tie = true;
    return true;
  }

  return false;
};

const hasClicked = function (cell) {
  // console.log(cell);
  let className = cell.getAttribute("class").split(" ")[1];
  return document.querySelector(`.${className} img`).getAttribute("src") !== "";
};

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (game.gameDone || hasClicked(cell)) return;
    let className = cell.getAttribute("class").split(" ")[1];
    let imgObj = document.querySelector(`.${className} img`);
    // console.log(imgObj);
    imgObj.setAttribute(
      "src",
      game.times % 2 ? "images/O.png" : "images/X.png"
    );
    game.times++;
    if (checkWin()) {
      game.gameDone = true;
      if (game.tie) {
        document.getElementById("winner").innerHTML = "Tie!";
      } else {
        document.getElementById("winner").innerHTML = game.OWon
          ? "O Won!"
          : "X Won !";
      }
    }
  });
});

document.getElementById("refresh").addEventListener("click", () => {
  let cells = document.querySelectorAll("#grid li");
  cells.forEach((cell) => {
    let imgObj = document.querySelector(
      `.${cell.getAttribute("class").split(" ")[1]} img`
    );
    imgObj.setAttribute("src", "");
  });

  game.tie = game.OWon = game.XWon = game.gameDone = false;
  game.times = 0;
  document.getElementById("winner").innerHTML = "";
});
