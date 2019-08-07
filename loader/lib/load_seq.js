const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (app) => {
    const db = {};
    const dbConfig = app.config.dbConfig;

    let conn;
    const env = process.env.NODE_ENV || 'development';
    if (env === 'development') {
        conn = dbConfig.mysql.dev;
    } else if (env === 'production') {
        conn = dbConfig.mysql.prod;
    } else {
        conn = dbConfig.mysql.dev;
    }


    const sequelize = new Sequelize(conn.database, conn.username, conn.password, {
        host: conn.host,
        port: conn.port,
        dialect: 'mysql',
        timezone: '+08:00',
        pool: {
            max: '10'
        },
        define: {
            timestamps: false
        }
    });

    fs
        .readdirSync(path.join(app.config.baseDir, './app/model'))
        .forEach(function (file) {
            let model = sequelize['import'](path.join(app.config.baseDir, './app/model', file));
            sequelize[model.name] = model; //使db.modelName 指向一个model
        });
    app.model = db;
};
