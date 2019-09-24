/* eslint-disable no-sequences */

const pipe = initialValue => ({
  dom: (...fns) => fns.reduce((element, fn) => fn(element), initialValue)
});
const getElement = className => document.querySelector(`.${className}`);
const createElement = (elt = "div") => document.createElement(elt);
const addClass = className => elt => (elt.classList.add(className), elt);
const addText = text => elt => ((elt.innerText = text), elt);
const addParam = param => data => elt => ((elt[param] = data), elt);
const mountElement = target => elt => target.appendChild(elt);
const unmountElement = target => elt => target.removeChild(elt);

const functions = {
  pipe,
  getElement,
  createElement,
  addClass,
  addText,
  addParam,
  mountElement,
  unmountElement
};

export {
  pipe,
  getElement,
  createElement,
  addClass,
  addText,
  addParam,
  mountElement,
  unmountElement,
  functions
};
