const path = require('path');

module.exports = (app)=> {
    app.helper = require(path.join(app.config.baseDir, './app/helper'));
};
