const path = require('path');



/**
 * 路由目录
 * 总入口
 */


module.exports = function(app){

    require('./routes/index')(app);

    // app.all('/', require('./routes/back/index')(app));


    // catch 404 and forward to error handler

};



