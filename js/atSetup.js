const transformArrayValuesToString = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].join(",");
    }
  });
  return obj;
};

window.targetPageParams = function () {
  // read data from local storage
  if (typeof Storage !== "undefined") {
    var targetingParamStr = localStorage.getItem("zeoParamsStoreLocal");

    if (targetingParamStr) {
      // Do your processing
      // make targetting using targetting Params
      try {
        const params = JSON.parse(targetingParamStr);
        return { ...transformArrayValuesToString(params) };
      } catch (e) {
        console.error(e);
        return {};
      }
    }
  }
};
