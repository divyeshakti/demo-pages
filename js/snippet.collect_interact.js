!(function (e, t) {
  var n = t.createElement("script");
  (n.type = "text/javascript"),
    (n.crossorigin = "anonymous"),
    (n.async = !0),
    // (n.src = "http://localhost:8081/zeotap.min.js"),
    (n.src = "https://content.zeotap.com/sdk/qa/zeotap-alpha.min.js"),
    (n.onload = function () {});
  var s = t.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(n, s);
  function o(e, t, n) {
    function s(t) {
      e[t] = function () {
        e[n].push([t].concat(Array.prototype.slice.call(arguments, 0)));
      };
    }
    for (var o = 0; o < t.length; o++) s(t[o]);
  }
  var r = e.zeotap || { _q: [], _qcmp: [] };
  o(
    r,
    [
      "init",
      "setEventProperties",
      "setUserProperties",
      "setPageProperties",
      "setMetaProperties",
      "setUserIdentities",
      "unsetUserIdentites",
      "getAllIdentities",
      "setZI",
    ],
    "_q"
  ),
    o(r, ["setConsent", "addAskForConsentActionListener"], "_qcmp"),
    (e.zeotap = r);
})(window, document);

!(function (win, doc) {
  var zs = doc.createElement("script");
  zs.type = "text/javascript";
  // zs.integrity = '';
  zs.crossorigin = "anonymous";
  zs.async = true; // the script is loaded asynchronously
  //   zs.src = "http://localhost:8081/interact.min.js";
  zs.src = "https://content.zeotap.com/sdk/qa/interact.min.js";

  zs.onload = function () {};

  var s = doc.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(zs, s);
  var funcs = ["init", "setUserIdentities"];
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
})(window, document);

window.zeotap.init("b8de972e-a754-4c70-90bb-e4384a02551c");
window.zeotapInteract.init();
