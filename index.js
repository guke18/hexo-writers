var serveStatic = require('serve-static'),
  bodyParser = require('body-parser'),
  path = require('path'),
  api = require('./api');

var passwordProtected = hexo.config.writers && hexo.config.writers.username;

// verify that correct config options are set.
if (passwordProtected) {
  if (!hexo.config.writers.password_hash) {
    console.error('[Hexo Writers]: config writers.password_hash is requred for authentication');
    passwordProtected = false;
  } else if (hexo.config.writers.password_hash.length <= 32) {
    throw new Error('[Hexo Writers]: the provided password_hash looks like an md5 hash -- hexo-writers has switched to use bcrypt; see the Readme for more info.')
  }

  if (!hexo.config.writers.secret) {
    console.error('[Hexo Writers]: config writers.secret is requred for authentication');
    passwordProtected = false;
  }

}

hexo.extend.filter.register('server_middleware', function(app) {

  if (passwordProtected) {
    require('./auth')(app, hexo);   // setup authentication, login page, etc.
  }

  // Main routes
  app.use(hexo.config.root + 'write/', serveStatic(path.join(__dirname, 'www')));
  app.use(hexo.config.root + 'write/api/', bodyParser.json({limit: '50mb'}));

  // setup the json api endpoints
  api(app, hexo);
});
