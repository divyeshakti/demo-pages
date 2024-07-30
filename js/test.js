// window.addEventListener("sendGAMessage", function ($event) {
//   console.log("event.data: ", JSON.stringify($event.detail));
//   var resp = JSON.stringify($event.detail);
//   const div = document.querySelector("#gamevents");
//   const elem = document.createElement("p");
//   elem.textContent = resp;
//   div.appendChild(elem);
//   //   div.textContent = resp;
// });

window.zGAMCallback = function (data) {
  console.log("zGAMCallback: ", JSON.stringify(data));
  var resp = JSON.stringify(data);
  const div = document.querySelector("#gamfunctions");
  const elem = document.createElement("p");
  elem.textContent = resp;
  div.appendChild(elem);
  //   div.textContent = resp;
};

document.querySelector("#submit").addEventListener("click", function () {
  var fieldName = document.querySelector("#fieldName").value;
  var fieldValue = document.querySelector("#fieldValue").value;
  window.zeotapInteract.setUserIdentities({ [fieldName]: fieldValue });
  displayIdentities();

  // window.location.href = "/store";
});

document
  .querySelector("#resetIdentities")
  .addEventListener("click", function () {
    displayIdentities();
    // window.location.href = "/store";
  });

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  displayIdentities();

  // window.zeotapInteract.setUserIdentities({
  //   email: "divye.m@zeotap.com",
  // });
});

function displayIdentities() {
  const identities = window.zeotapInteract
    ? window.zeotapInteract.getUserIdentities()
    : {};
  const div = document.querySelector("#identities");
  if (div) {
    div.innerHTML = ""; // Clear previous contents
    for (const key in identities) {
      const elem = document.createElement("p");
      elem.textContent = `${key}: ${identities[key]}`;
      div.appendChild(elem);
    }
  }
  // div.innerHTML = ""; // Clear previous contents
  // const value = localStorage.getItem("");
  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   const value = localStorage.getItem(key);
  //   const elem = document.createElement("p");
  //   elem.textContent = `${key}: ${value}`;
  //   div.appendChild(elem);
  // }
}
