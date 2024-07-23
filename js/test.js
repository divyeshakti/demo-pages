window.addEventListener("sendGAMessage", function ($event) {
  console.log("event.data: ", JSON.stringify($event.detail));
  var resp = JSON.stringify($event.detail);
  const div = document.querySelector("#gamevents");
  const elem = document.createElement("p");
  elem.textContent = resp;
  div.appendChild(elem);
  //   div.textContent = resp;
});

window.zGAMCallback = function (data) {
  console.log("zGAMCallback: ", JSON.stringify(data));
  var resp = JSON.stringify(data);
  const div = document.querySelector("#gamfunctions");
  const elem = document.createElement("p");
  elem.textContent = resp;
  div.appendChild(elem);
  //   div.textContent = resp;
};

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired");
  // window.zeotapInteract.setUserIdentities({
  //   email: "divye.m@zeotap.com",
  // });
});
