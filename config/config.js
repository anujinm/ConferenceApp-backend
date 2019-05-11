module.exports = {
    development: {
        username: process.env.CONF_MYSQL_USER,
        password: process.env.CONF_MYSQL_PASSWORD,
        database: process.env.CONF_MYSQL_DATABASE,
        host: process.env.CONF_MYSQL_HOST,
        dialect: "mysql",
        operatorsAliases: false
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        operatorsAliases: false
    },
    production: {
        username: process.env.CONF_MYSQL_USER,
        password: process.env.CONF_MYSQL_PASSWORD,
        database: process.env.CONF_MYSQL_DATABASE,
        host: process.env.CONF_MYSQL_HOST,
        dialect: "mysql",
        operatorsAliases: false
    }
};
