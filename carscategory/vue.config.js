module.exports  = {
    devServer: {
        host: "localhost",
        port: "8080",
        https: false,
        hot: true,
        proxy: {
            '^/api': {
                target: 'http://apis.juhe.cn/',
                secure: false, //带SSLhttps
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '',
                }
            }
        }
    }
}