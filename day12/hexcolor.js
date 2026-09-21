const HEX_CHARS = "0123456789ABCDEF";

const randomColorButton = document.querySelector("#random-color-btn");
const clearColorButton = document.querySelector("#clear-color-btn");

const colorPreviewBox = document.querySelector("#color-preview");
const colorValueOutput = document.querySelector("#color-value");
const colorHistoryList = document.querySelector("#color-history");

function generateRandomHexColor() {
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    hexColor += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
  }

  return hexColor;
}

function showColor(hexColor) {
  colorPreviewBox.style.backgroundColor = hexColor;
  colorValueOutput.textContent = hexColor;
}

function handleRandomColorClick() {
  const hexColor = generateRandomHexColor();

  showColor(hexColor);
}

randomColorButton.addEventListener("click", handleRandomColorClick);
clearColorButton.addEventListener("click", handleClearColorClick);
