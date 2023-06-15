const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/api22', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/auth', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/vote', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/board', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
};