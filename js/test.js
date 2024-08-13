function getQueryParams() {
  var queryParams = {};
  var queryString = window.location.search.substring(1);
  var params = queryString.split("&");
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split("=");
    var key = decodeURIComponent(param[0]);
    var value = decodeURIComponent(param[1]);
    if (!!key && value !== undefined) queryParams[key] = value;
  }
  return queryParams;
}

function setQueryParams(params) {
  var queryString = "";
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = encodeURIComponent(params[key]);
      queryString += key + "=" + value + "&";
    }
  }
  queryString = queryString.slice(0, -1); // Remove the trailing '&'
  window.location.search = queryString;
}

function getSessionStorage() {
  var sessionStorage = window.sessionStorage;
  var sessionData = sessionStorage.getItem("zeotapInteract") || "{}";
  try {
    return JSON.parse(sessionData);
  } catch (error) {
    console.error("Error parsing session data:", error);
    return {};
  }
}

function setSessionStorage(data) {
  var sessionStorage = window.sessionStorage;
  sessionStorage.setItem("zeotapInteract", JSON.stringify(data));
}

window.addEventListener("sendGAMessage", function ($event) {
  console.log("event.data: ", JSON.stringify($event.detail));
  var resp = " sendGAMessage: " + JSON.stringify($event.detail);
  const div = document.querySelector("#gamfunctions");
  const elem = document.createElement("p");
  elem.textContent = resp;
  div.appendChild(elem);
  //   div.textContent = resp;
});

window.zGAMCallback = function (data) {
  console.log("zGAMCallback: ", JSON.stringify(data));
  var resp = "zGAMCallback :" + JSON.stringify(data);
  const div = document.querySelector("#gamfunctions");
  const elem = document.createElement("p");
  elem.textContent = resp;
  div.appendChild(elem);
  //   div.textContent = resp;
};
window.zeotapGAMCallback = function (data) {
  console.log("zeotapGAMCallback: ", JSON.stringify(data));
  var resp = "zeotapGAMCallback :" + JSON.stringify(data);
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
});

document.querySelector("#setwritekey").addEventListener("click", function () {
  var writekey = document.querySelector("#writekey").value;
  setQueryParams({ ...getQueryParams(), writekey: writekey });
  window.zeotapInteract.init(writekey);
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
}
