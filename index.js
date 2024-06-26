console.log("Hello, world!");

function createDivToBody(styleProperties) {
  const div = document.createElement("div");
  div.id = "uniqueId";
  Object.assign(div.style, styleProperties);
  return div;
}

function appendDivToBody(div) {
  document.body.appendChild(div);
}

function fill(div, html) {
  div.innerHTML = html;
  return div;
}

function createADialog() {
  const dialog = document.createElement("dialog");
  dialog.id = "dialog";
  dialog.open = true;
  dialog.appendChild(fill(createDivToBody({ color: "red" }), "Hello, world!"));
  document.body.appendChild(dialog);
}
(function () {
  //   createADialog();
  appendDivToBody(fill(createDivToBody({ color: "red" }, "Hello, world!")));
})();
