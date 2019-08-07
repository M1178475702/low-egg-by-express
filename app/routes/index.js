module.exports = (app)=>{
    const {controller} = app;
    app.get('/index', controller.index.test)
};
