module.exports  = {
    devServer: {
        host: "localhost",
        port: "8080",
        https: false,
        hot: true,
        proxy: {
            '^/api': {
                target: 'http://v.juhe.cn/',
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