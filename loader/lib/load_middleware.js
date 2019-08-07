const path = require('path');
const _utils = require('./utils');

module.exports = (app) =>{
    const middleware_list = _utils(path.join(app.config.baseDir, './app/middleware'));
    //check valid
    for(const middleware of middleware_list){
        if(typeof middleware !== 'function'){
            throw TypeError(`middleware should be function but get ${typeof middleware}`);
        }
    }

    app.middleware = middleware_list;
};
