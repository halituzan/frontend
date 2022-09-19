const { createProxyMiddleware } = require("http-proxy-middleware");

module.export = function (app) {
  app.use(
    "/ty",
    createProxyMiddleware({
      target: "https://api.trendyol.com/",
      changeOrigin: true,
    })
  );
  app.use(
    "/self",
    createProxyMiddleware({
      target: "http://3.129.59.0:4000/",
      changeOrigin: true,
    })
  );
};
