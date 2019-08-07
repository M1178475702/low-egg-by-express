const _utils = require('./utils');
const path = require('path');

class ServiceManager {
    constructor(app, services) {
        this.app = app;
        this.services = services;
        this.instance = {};
    }
}


module.exports = (app) => {

    app.services = _utils.load({}, path.join(app.config.baseDir, './app/service'));
    app.use(function (req, res, next) {

        const manager = new ServiceManager(req.app, app.services);
        req.service = new Proxy(manager, {

            get: function (manager, key) {
                if (manager.instance[key])
                    return manager.instance[key];
                else if (manager.services[key]) {
                    if (typeof manager.services[key] === 'function') {
                        manager.instance[key] = new manager.services[key](req, res);
                        return manager.instance[key];
                    } else {
                        throw TypeError('Service must be class');
                    }
                } else {
                    throw ReferenceError(`no service named ${key}`);
                }
            }
        });
        next();
    });


};


