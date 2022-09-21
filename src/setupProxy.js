const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/ty", {
      target: "https://api.trendyol.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "http://18.118.241.229:4000/",
      changeOrigin: true,
      headers: {
        accept: "application/json",
      },
    })
  );
};
