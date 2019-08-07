const Service = require('../../core/service');

class IndexService extends Service{
    async test(){
        console.log('service index/test');
        return 'test';
    }
}
module.exports = IndexService;
