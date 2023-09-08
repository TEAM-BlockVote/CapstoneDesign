const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
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

  app.use(
    createProxyMiddleware('/sms', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/nawoo', {
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  )
};