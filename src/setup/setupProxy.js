const proxy = require("http-proxy-middleware");

module.export = function (app) {
  app.use("/ty", { target: "https://api.trendyol.com/" });
  app.use("/self", { target: "http://3.129.59.0:4000/" });
};
