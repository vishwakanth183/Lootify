const dbConfig = require("../config/dp.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.users = require("./user.model.js")(sequelize, Sequelize);
db.addresses = require("./address.model.js")(sequelize, Sequelize);
Object.keys(db).forEach((modelName) => {
    if (db[modelName].association) {
        db[modelName].association(db);
    }
});
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;