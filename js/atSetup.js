var profileDetails = {
  name: "zeotap-profile-api",
  version: "1.0.0",
  timeout: 4000,
  provider: function (callback) {
    // read data from local storage
    if (typeof Storage !== "undefined") {
      var targetingParamStr = localStorage.getItem("zeoParamsStoreLocal");

      if (targetingParamStr) {
        // Do your processing
        // make targetting using targetting Params
        try {
          const params = JSON.parse(targetingParamStr);
          callback(null, params);
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
};
window.targetGlobalSettings = {
  dataProviders: [profileDetails],
};
