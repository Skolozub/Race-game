import { settings } from "./constants/settings";
import { gameArea, startBtn, playground, car, line } from "./dom";
import { functions } from "./global/functions";
import "./styles.css";

const state = {
  keyCodes: [],
  settings,
  lines: [],
  lineHeight: 50,
  linesIndent: 30
};

const changePlayerPosition = (playgroundCoords, carCoords, key) => {
  const deltaTop = carCoords.top - playgroundCoords.top;
  const deltaBottom = playgroundCoords.bottom - carCoords.bottom;
  const deltaRight = playgroundCoords.right - carCoords.right;
  const deltaLeft = carCoords.left - playgroundCoords.left;

  switch (key) {
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
  const { pipe, createElement, addClass, mountElement } = functions;
  const { height: playgroundHeight } = playgroundCoords;
  const { lineHeight, linesIndent } = state;

  const numberOfLines =
    Math.ceil(playgroundHeight / (lineHeight + linesIndent)) + 2;

  const numberOfNewLines = numberOfLines - state.lines.length;
  if (numberOfNewLines <= 0) return null;

  const newLines = [...Array(numberOfNewLines)].map(() =>
    pipe(createElement("div")).dom(addClass("line"), mountElement(playground))
  );

  state.lines = [...state.lines, ...newLines];
};

const animateLines = () => {
  state.lines.forEach((line, i) => {
    const isNextLineStart = i
      ? state.lines[i - 1].getBoundingClientRect().top >= state.linesIndent
      : true;

    if (isNextLineStart)
      line.style.top = `${line.getBoundingClientRect().top + settings.speed}px`;
  });
};

const clearLines = playgroundCoords => {
  state.lines.forEach(line => {
    const lineCoords = line.getBoundingClientRect();
    if (lineCoords.top - state.lineHeight >= playgroundCoords.height) {
      const deletingElement = state.lines.shift();
      functions.unmountElement(playground)(deletingElement);
    }
  });
};

const playGame = () => {
  if (!state.settings.isStart) return null;

  const playgroundCoords = playground.getBoundingClientRect();
  const carCoords = car.getBoundingClientRect();

  state.keyCodes.forEach(key =>
    changePlayerPosition(playgroundCoords, carCoords, key)
  );

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
  state.keyCodes = [...state.keyCodes, event.keyCode];
};

const carStop = event => {
  event.preventDefault();
  state.keyCodes = state.keyCodes.filter(key => key !== event.keyCode);
};
