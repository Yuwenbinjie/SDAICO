const configConst = require('./const.js')

module.exports = {
    devServer: {
        contentBase: '/dist/'+configConst.base,
        hot: true,
        disableHostCheck: true,
        open: true,
        //openPage: '',
        overlay: true,
        host: 'localhost',
        proxy: {
            '/qualification': {
                target: 'http://admin.deal-api.com',
                secure: false,
                changeOrigin: true,
            },
        }
    }
}