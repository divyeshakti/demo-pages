(function (win, doc) {
  var zs = doc.createElement("script");
  zs.type = "text/javascript";
  // zs.integrity = '';
  zs.crossorigin = "anonymous";
  zs.async = true; // the script is loaded asynchronously
  zs.src = "http://localhost:8081/interact.min.js";
  //   zs.src = "https://content.zeotap.com/sdk/qa/interact.min.js";
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
window.zeotapInteract.init("39e82d18-0151-4ba3-84d1-9e3dba037917");
