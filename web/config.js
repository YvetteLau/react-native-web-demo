module.exports = {
  build: {
    entry: 'jsbundles/RNDemo.web.js',
    publicPath: '/',
    assetsRoot: 'build-web',
    src: 'jsbundles',
    template: {
      title: 'demo'
    }
  },
  dev: {
    entry: 'jsbundles/RNDemo.web.js',
    publicPath: '/',
    assetsRoot: 'build-web',
    src: 'jsbundles',
    port: 3000,
    template: {
      title: 'demo'
    }
  }
}
