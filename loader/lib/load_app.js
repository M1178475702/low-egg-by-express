const app = require('../../core/application');
const express = require('express');
const path = require('path');
const load_config = require('./load_config');
const load_seq = require('./load_seq');
const load_controller = require('./load_controller');
const load_service = require('./load_service');
const load_router = require('./load_router');

const cookieParser = require('cookie-parser');
const logger = require('morgan');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


load_config(app);
load_seq(app);
load_controller(app);
load_service(app);
load_router(app);

app.use(function(req, res, next) {
    res.send('404error');
});

app.use(function(err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
});



module.exports = app;

