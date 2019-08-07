
class Controller {
    constructor(req, res){
        this.req = req;
        this.res = res;
    }

    get app(){
        return this.req.app;
    }

    get service(){
        return this.req.service;
    }

}
module.exports = Controller;
