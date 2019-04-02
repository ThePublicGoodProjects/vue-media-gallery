module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/media-gallery/'
        : '/',
    // css: {extract: false},
    configureWebpack: {
        output: {
            libraryExport: 'default'
        }
    }
};
