const defaultColors = Object.freeze([
  "#91610f",
  "#935115",
  "#91411d",
  "#8d3225",
  "#86232d",
  "#8b2e29",
  "#8e3825",
  "#914322",
  "#916a1c",
  "#829035",
  "#62b26a",
  "#00d2b1",
]);

const RESET_COLOR = "#888888";
const DEFAULT_FONT_COLOR = "#fff4f8";

let colors = [...defaultColors];
let _fontColor = DEFAULT_FONT_COLOR;

const loadColorsFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("colors"));
  } catch (error) {
    return null;
  }
};

const storeColors = () => {
  localStorage.setItem(
    "colors",
    JSON.stringify({ colors, fontColor: _fontColor })
  );
};

function rgbToHex(rgbString) {
  return (
    "#" +
    rgbString
      .match(/\d+/g)
      .map((s) => {
        s = parseInt(s).toString(16);
        return s.length < 2 ? "0" + s : s;
      })
      .join("")
  );
}

/* 
  Background color state is managed in a service rather than a React component
  for good reason.

  In order to have the background color change as a user updates a color input
  in the control-panel, React state would have to be used. Using react state
  results in the browser default color picker disappearing as soon as the user
  clicks a color in the color well due to render being triggered when state is
  changed. This results in the user's inability to click and drag while choosing
  colors from a input[type="color"] element. As soon as the color changes, the
  picker is removed from the DOM when the component's render method is called.
  For this reason, a service for updating and reading the state of the
  background on the document.body element is used.
*/
const renderColors = () => {
  document.body.style.backgroundImage = null;
  document.body.style.backgroundColor = null;
  document.body.style.color = _fontColor;
  if (colors.length > 1) {
    const gradient = `linear-gradient(to right top, ${colors.join(",")})`;
    document.body.style.backgroundImage = gradient;
  } else if (colors.length === 1) {
    document.body.style.backgroundColor = colors[0];
  } else {
    document.body.style.backgroundColor = RESET_COLOR;
  }
};

export const initColors = () => {
  const storedColors = loadColorsFromStorage();
  if (storedColors) {
    colors = storedColors.colors;
    _fontColor = storedColors.fontColor;
  }
  renderColors();
};

export const bgColors = () => {
  // window and document are undefined when gatsby renders for production build
  if (typeof window === "undefined") {
    return [];
  }
  const { backgroundColor, backgroundImage } = document.body.style;
  if (backgroundColor) {
    return [rgbToHex(backgroundColor)];
  }

  const colors = backgroundImage
    .match(/rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)/g)
    .map(rgbToHex);

  return colors;
};

export const setColorAt = (index, color) => {
  colors[index] = color;
  renderColors();
  storeColors();
};

export const removeColorAt = (index) => {
  colors.splice(index, 1);
  renderColors();
  storeColors();
};

export const pushColor = (color) => {
  colors.push(color);
  renderColors();
  storeColors();
};

export const clear = () => {
  colors = [RESET_COLOR];
  renderColors();
  storeColors();
};

export const setFontColor = (colorHex) => {
  _fontColor = colorHex;
  renderColors();
  storeColors();
};

export const fontColor = () => _fontColor;
