module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: process.env.PROXY_ADDRESS || '',
                ws: true, //是否跨域
                changeOrigin: true
            }
        }
    },
}