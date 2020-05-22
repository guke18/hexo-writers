const bcrypt = require("bcrypt-nodejs")

module.exports = function (hexo) {
    this.name = "writersAuth";

    function failed_validation( request, response ) {
        const redirectUrl = hexo.config.root + "write/login"
        response.writeHead(303, { 'Location':  redirectUrl });
        response.end();
    }

    function validate_credentials( executionScope, request, response, callback ) {
        for (let [username, hash] of Object.entries(hexo.config.writers.credentials)) {
            if (request.body.username == username && bcrypt.compareSync(request.body.password, hash)) {
                executionScope.success({name:request.body.user}, callback)
                return
            }
        }
        failed_validation(request, response);
    }

    this.authenticate = function(request, response, callback) {
        if (request.body && request.body.username && request.body.password ) {
            validate_credentials( this, request, response, callback );
        }
        else {
            failed_validation( request, response, request.url );
        }
    };

    return this;
};
