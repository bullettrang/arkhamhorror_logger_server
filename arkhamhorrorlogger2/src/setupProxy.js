const proxy = require('../node_modules/http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy(['/api/', '/auth/google'], { target: 'http://localhost:5000' }));
};