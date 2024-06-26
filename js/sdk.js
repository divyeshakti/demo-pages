window.StandardComponent = zoid.create({
  // The html tag used to render my component
  tag: "standard-component",
  dimensions: {
    width: "100%",
    height: "100%",
  },
  // The url that will be loaded in the iframe or popup, when someone includes my component on their page
  url: ({ props }) => {
    if (!!props?.url) return props?.url;
    return "";
  },
  props: {
    onActionPerformed: {
      type: "function",
    },
    url: {
      type: "string",
      required: false,
    },
  },
});

function renderComponent(url, container) {
  window
    .StandardComponent({
      onActionPerformed: function (action) {
        console.log("Action performed:", action);
        document.querySelector("#result").innerText =
          action?.data + " performed!";
      },
      url: url,
    })
    .render(container);
}
// window.renderDiscount = function (queryParams, container) {
//   const queryParamsString = new URLSearchParams(queryParams).toString();

//   window
//     .MyDiscountCoupon({
//       onDiscountApplied: function (discount) {
//         console.log("Discount applied:", discount);
//         document.querySelector("#result").innerText =
//           discount + " discount applied!";
//       },
//       queryProps: {
//         url: "http://localhost:8080/components/discounts?" + queryParamsString,
//       },
//     })
//     .render(container);
// };

function createOverlay(element) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.appendChild(element);
  document.body.appendChild(overlay);
}

function appendBanner() {
  const banner = createDiv("banner", "100%", "400px");
  document.body.appendChild(banner);
}

function createDiv(id, width, height) {
  const div = document.createElement("div");
  div.id = id;
  div.style.backgroundColor = "white";
  div.style.width = width;
  div.style.height = height;

  return div;
}
function fetchUserInteraction(zid, trigger) {
  return fetch(
    `http://localhost:3000/api/interact?zid=${zid}&trigger=${trigger}`
  ).then((response) => response.json());
}

// (function () {
//   const users = [
//     "churningUser",
//     "newUser",
//     "normalUser",
//     "loyalUser",
//     "default",
//   ];

//   users.forEach((user) => {
//     fetchUserInteraction(user);
//   });
//   document
//     .getElementById("showOverlay")
//     .addEventListener("click", function () {});
// })();

function doOverlay() {
  createOverlay(createDiv("overlayContent", "640px", "320px"));
}
//
// {
//     "type": "render",
//     "data": {
//       "where": {
//         "mode": "overlay"
//       },
//       "templateData": {
//         "discount": "30"
//       },
//       "url": "http://localhost:3000/discount=30"
//     }
//   }
document.addEventListener("customEvent", function (event) {
  console.log("event.data: " + JSON.stringify(event));
  const div = document.querySelector("#sampleDiv");
  div.textContent = div.appendChild(
    document.createTextNode("event.data: " + JSON.stringify(event.data))
  );
});

document.addEventListener("sendGAMessage", function ($event) {
  console.log("event.data: " + JSON.stringify($event));
  const div = document.querySelector("#gamevents");
  div.textContent = div.appendChild(
    document.createTextNode("event.data: " + JSON.stringify($event.data))
  );
});

const renderUserInteraction = (response) => {
  if (response.type === "render" && response.data.where.mode === "overlay") {
    doOverlay();
    renderComponent(response.data.url, "#overlayContent");
  }

  if (
    response.type === "render" &&
    response.data.where.mode === "bottomBanner"
  ) {
    appendBanner();
    renderComponent(response.data.url, "#banner");
  }
};
function onPageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  // get the targeted interaction based on the user active on page Load
  if (user) fetchUserInteraction(user, "pageLoad").then(renderUserInteraction);
  else fetchUserInteraction("nouser", "pageLoad").then(renderUserInteraction);
  document.dispatchEvent(new Event("customEvent", { id: "123" }));
}

window.addEventListener("DOMContentLoaded", function () {
  // Code to be executed after the content is loaded goes here
  onPageLoad();
});
