const _utils = require('./utils');
const path = require('path');
module.exports = (app)=>{
    const config = {};
    config.baseDir = process.cwd();
    app.config = Object.assign(config, require(path.join(config.baseDir, './config/config')))

};

