const _utils = require('./utils');
const path = require('path');

class ControllerManager {
    constructor(app) {
        this.app = app;
    }

    get controllers() {
        return this.app.controllers;
    }
}


module.exports = (app) => {

    app.controllers = _utils.load({}, path.join(app.config.baseDir, './app/controller'));
    //使用proxy实例化controller
    const manager = new ControllerManager(app);
    const controller_proxy_handler = {
        get: function (class_object, key) {
            if (typeof app.controllers[class_object.name].prototype[key] === 'function') {
                //todo 当确定为controller类时，返回一个中间件，调用目标函数
                return async function (req, res) {
                    const controller = new app.controllers[class_object.name](req, res);
                    await controller[key]();
                }
            }
        },
        set: function (target, key) {
            //nothing
        }
    };
    const manager_proxy_handler = {
        get: function (manager, key) {
            if (manager.controllers) {
                if (typeof manager.controllers[key] === 'object')
                    return new Proxy(manager.controllers[key], this);
                else if (typeof manager.controllers[key] === 'function') {
                    return new Proxy({name: key}, controller_proxy_handler)
                }
            }
        },
        set: function (target, key) {
            //nothing
        }
    };

    app.controller = new Proxy(manager, manager_proxy_handler);

};

