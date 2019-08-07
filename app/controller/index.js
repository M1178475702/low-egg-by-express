const Controller = require('../../core/controller');

class IndexController extends Controller{
    async test(){
        console.log(await this.service.index.test());
        this.res.send('index ni hao');
    }
}
module.exports = IndexController;
