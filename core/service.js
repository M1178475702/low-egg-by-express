
class Service {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    get app(){
        return this.req.app;
    }

    get model(){
        return this.app.model;
    }

    get service(){
        return this.req.service;
    }

}
module.exports = Service;
