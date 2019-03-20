module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/mhc-gallery-vue/'
        : '/',
    // css: {extract: false},
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    }
};
