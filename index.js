const serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    path = require('path'),
    api = require('./api')

let passwordProtected = hexo.config.writers && hexo.config.writers.credentials

// verify that correct config options are set.
if (passwordProtected) {
  const usernames = Object.keys(hexo.config.writers.credentials)
  if(!usernames.length){
    console.error('[Hexo Writers]: config writers.users must have at least one user for authentication');
    passwordProtected = false;
  }
  else {
    for(let username of usernames){
      if (hexo.config.writers.credentials[username].length <= 32){
        throw new Error('[Hexo Writers]: the password for '+username+' looks like an md5 hash -- hexo-writers uses bcrypt; see the Readme for more info.')
      }
    }
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
