import {
  pipe,
  getElement,
  createElement,
  addClass,
  addText,
  addParam,
  mountElement
} from "./global/functions";

const root = getElement("root");

const score = pipe(createElement()).dom(addClass("score"), mountElement(root));

const gameArea = pipe(createElement()).dom(
  addClass("gameArea"),
  mountElement(root)
);

const startBtn = pipe(createElement("button")).dom(
  addClass("startBtn"),
  addText("Начать игру!"),
  mountElement(gameArea)
);

const playground = pipe(createElement()).dom(addClass("playground"));

const car = pipe(createElement("img")).dom(
  addClass("car"),
  addParam("src")("./img/player.png")
);

export { root, score, gameArea, startBtn, playground, car };
