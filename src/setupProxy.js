const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/ty",
    createProxyMiddleware({
      target: "https://api.trendyol.com",
      changeOrigin: true,
    })
  );
  app.use(
    "/self",
    createProxyMiddleware({
      target: "http://18.118.241.229:4000",
      changeOrigin: true,
    })
  );
};
