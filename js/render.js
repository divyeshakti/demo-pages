function applyStyleToElement(div, style) {
  Object.keys(style).forEach((key) => {
    div.style[key] = style[key];
  });
}

function createDiv(style) {
  const div = document.createElement("div");
  div.classList.add("interactDiv");
  applyStyleToElement(div, style);
  return div;
}

function appendDivToBody(div) {
  document.body.appendChild(div);
}

function setDisplayProperty(div, value) {
  div.style.display = value;
}

function hideDiv(div) {
  setDisplayProperty(div, "none");
}

function removeDiv(div) {
  div.remove();
}

function addCloseButtonToDivTopRight(div) {
  const closeButton = document.createElement("button");
  div.style.display = "relative";
  closeButton.textContent = "X";
  const style = {
    background: "transparent",
    border: "unset",
    cursor: "pointer",
    position: "absolute",
    top: "0",
    right: "0",
  };
  applyStyleToElement(closeButton, style);

  closeButton.addEventListener("click", function () {
    removeDiv(div);
  });
  div.appendChild(closeButton);
}

// const testDiv = createDiv({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100px",
//   height: "100px",
//   backgroundColor: "red",
// });
// addCloseButtonToDivTopRight(testDiv);
// appendDivToBody(testDiv);
