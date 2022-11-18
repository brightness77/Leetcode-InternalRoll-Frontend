
const {createProxyMiddleware} = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'http://localhost:8081',
//             changeOrigin: true,
//         })
//     );
// }

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8081',
            //target: 'http://172.31.25.119:8081',
            changeOrigin: true,
        })
    );
}
