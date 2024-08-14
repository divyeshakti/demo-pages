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
    if (key !== undefined && params.hasOwnProperty(key)) {
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

function getWriteKey(env = "qa") {
  return {
    qa: "39e82d18-0151-4ba3-84d1-9e3dba037917",
    staging: "5d8ce731-f41d-44a7-a9e8-9a6713b67404",
  }[env];
}

(function (win, doc) {
  var zs = doc.createElement("script");
  zs.type = "text/javascript";
  // zs.integrity = '';
  zs.crossorigin = "anonymous";
  zs.async = true; // the script is loaded asynchronously
  var params = getQueryParams();

  var storage = getSessionStorage();
  if (!!params["env"]) {
    storage["env"] = params["env"];
    setSessionStorage(storage);
  } else {
    if (storage["env"]) {
      setQueryParams({ ...getQueryParams(), env: storage["env"] });
    }
  }

  if (!!params["writekey"]) {
    storage["writekey"] = params["writekey"];
    setSessionStorage(storage);
  } else {
    if (storage["writekey"]) {
      setQueryParams({ ...getQueryParams(), writekey: storage["writekey"] });
    }
  }

  if (storage["env"] === "staging") {
    zs.src = "../js/staging/interact.min.js";
  } else {
    zs.src = "../js/interact.min.js";
  }

  //   zs.src = "http://localhost:8081/interact.min.js";
  // this is just to trigger again
  zs.onload = function () {};

  var s = doc.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(zs, s);
  var funcs = ["init", "setUserIdentities", "getUserIdentities"];
  function setUpProxy(instance, functions, queue) {
    function proxyMain(fn) {
      instance[fn] = function () {
        // all arguments should be appended with the default call that needs to recorded per call
        instance[queue].push(
          [fn].concat(Array.prototype.slice.call(arguments, 0))
        );
      };
    }
    for (var k = 0; k < functions.length; k++) {
      proxyMain(functions[k]);
    }
  }
  var zeotapInteract = win.zeotapInteract || { _q: [] };
  setUpProxy(zeotapInteract, funcs, "_q");
  win.zeotapInteract = zeotapInteract;

  const writeKey = !!storage["writekey"]
    ? storage["writekey"]
    : getWriteKey(storage["env"] || "qa");
  window.zeotapInteract.init(writeKey);
})(window, document);
