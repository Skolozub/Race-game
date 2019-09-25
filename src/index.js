import { settings } from "./constants/settings";
import { gameArea, startBtn, playground, car, line } from "./dom";
import { functions } from "./global/functions";
import "./styles.css";

const state = {
  keyCode: undefined,
  settings,
  lines: [],
  lineHeight: 50,
  linesIndent: 20
};

const changePlayerPosition = (playgroundCoords, carCoords) => {
  const deltaTop = carCoords.top - playgroundCoords.top;
  const deltaBottom = playgroundCoords.bottom - carCoords.bottom;
  const deltaRight = playgroundCoords.right - carCoords.right;
  const deltaLeft = carCoords.left - playgroundCoords.left;

  switch (state.keyCode) {
    case 38:
    case 87: {
      if (deltaTop > 0) car.style.top = `${deltaTop - settings.speed}px`;
      break;
    }
    case 40:
    case 83: {
      if (deltaBottom > 0) car.style.top = `${deltaTop + settings.speed}px`;
      break;
    }
    case 39:
    case 68: {
      if (deltaRight > 0) car.style.left = `${deltaLeft + settings.speed}px`;
      break;
    }
    case 37:
    case 65: {
      if (deltaLeft > 0) car.style.left = `${deltaLeft - settings.speed}px`;
      break;
    }
    default:
      break;
  }
};

const createLines = playgroundCoords => {
  const { pipe, createElement, addClass, addParam, mountElement } = functions;
  const { height: playgroundHeight } = playgroundCoords;
  const { lineHeight, linesIndent } = state;

  const numberOfLines = Math.ceil(
    (playgroundHeight / (lineHeight + linesIndent)) * 1.2
  );

  const newLines = [...Array(numberOfLines - state.lines.length)].map(() =>
    pipe(createElement("div")).dom(
      addClass("line"),
      addParam("height")(lineHeight),
      mountElement(playground)
    )
  );

  state.lines = [...state.lines, ...newLines];
};

const animateLines = () => {
  state.lines.map((line, i) => {
    const start = i
      ? state.lines[i - 1].getBoundingClientRect().top + state.lineHeight
      : 500;

    if (start > state.lineHeight + state.linesIndent)
      line.style.top = `${line.getBoundingClientRect().top + settings.speed}px`;
  });
};

const clearLines = playgroundCoords => {
  state.lines.forEach(line => {
    const lineCoords = line.getBoundingClientRect();
    if (lineCoords.top - state.lineHeight > playgroundCoords.height) {
      const del = state.lines.shift();
      functions.unmountElement(playground)(del);
    }
  });
};

const playGame = () => {
  if (!state.settings.isStart) return null;

  const playgroundCoords = playground.getBoundingClientRect();
  const carCoords = car.getBoundingClientRect();

  state.keyCode && changePlayerPosition(playgroundCoords, carCoords);

  createLines(playgroundCoords);
  animateLines();
  clearLines(playgroundCoords);

  requestAnimationFrame(playGame);
};

const startGame = () => {
  functions.unmountElement(gameArea)(startBtn);

  state.settings.isStart = true;

  functions.mountElement(gameArea)(playground);
  functions.mountElement(playground)(car);

  document.addEventListener("keydown", carRun);
  document.addEventListener("keyup", carStop);

  requestAnimationFrame(playGame);
};

startBtn.addEventListener("click", startGame);

const carRun = event => {
  event.preventDefault();
  state.keyCode = event.keyCode;
};

const carStop = event => {
  event.preventDefault();
  state.keyCode = undefined;
};
