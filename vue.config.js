const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'src/assets',
  configureWebpack: {
    performance: {
      hints: false,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  devServer: {
    proxy: {
      '/api-auth': {
        target: process.env.VUE_APP_API_COLLAB_AUTH_URI,
        pathRewrite: { '^/api-auth': '/' },
        changeOrigin: true,
      },
      '/api-document': {
        target: process.env.VUE_APP_API_COLLAB_DOCUMENT_URI,
        pathRewrite: { '^/api-document': '/' },
        changeOrigin: true,
      },
    },
  },
});
