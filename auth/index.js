/**
 * This enables authentication for the writers pages.
 * All paths starting with /write/ are protected by cookie-based login, where
 * username must match a key in `writers.*` and the password's bcrypt hash must match
 * the value at that key.
 */

var cookieParser = require('cookie-parser')
  , serveStatic = require('serve-static')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , auth = require('connect-auth')
  , path = require('path')
  , authStrategy = require('./strategy')

module.exports = function (app, hexo) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: hexo.config.admin.secret
  }));
  app.use(hexo.config.root + 'write', auth(new authStrategy(hexo)));
  app.use(hexo.config.root + 'write/login', function (req, res) {
      if (req.method === 'POST') {
          req.authenticate(['writersAuth'], function(error, done) {
              if (done) {
                  res.writeHead(302, { 'Location':  hexo.config.root + "write/" });
                  res.end();
              }
          });
      } else {
          serveStatic(path.join(__dirname, '../www', 'login'))(req, res);
      }
  });
  app.use(hexo.config.root + 'write/', function (req, res, next) {
      req.authenticate(['writersAuth'], next)
  });
}
