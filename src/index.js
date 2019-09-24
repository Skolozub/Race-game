import "./styles.css";

/* DOM */
// const score = document.querySelector(".score");
const start = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");

const car = document.createElement("img");
car.classList.add("car");
car.src = "./img/car.png";

/* constants */
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const settings = {
  isStart: false,
  score: 0,
  speed: 3
};

/* functions */
const startGame = () => {
  start.classList.add("hide");
  settings.isStart = true;
  gameArea.appendChild(car);

  requestAnimationFrame(playGame);
};

const carRun = event => {
  event.preventDefault();
  keys[event.key] = true;
};

const carStop = event => {
  event.preventDefault();
  keys[event.key] = false;
};

const playGame = () => {
  if (!settings.isStart) return null;

  requestAnimationFrame(playGame);
};

/* listeners */
start.addEventListener("click", startGame);
document.addEventListener("keydown", carRun);
document.addEventListener("keyup", carStop);
