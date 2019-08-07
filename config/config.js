const config = {};


config.listen = {
    port: 3031
};


config.dbConfig = {
    mysql: {
        dev: {
            database:'esp_dev',
            username:'eps',
            password:'eps123456',
            host:   '123.59.128.170',
            port:   '3306'
        },
        test: {
            database:'esp_test',
            username:'esp_test',
            password:'esp123456',
            host:   '47.92.205.127',
            port:   '3306'
        },
        prod: {
            connectionString: 'mysql://eps:eps123456@123.59.128.170:3306/esp_dev?dateStrings=true&connectionLimit=10'
        }
    }
};


module.exports = config;
