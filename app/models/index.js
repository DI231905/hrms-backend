const Sequelize = require("sequelize");
const config = require("../config/db.config");

var sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  logging:false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.user = require("./user.model")(sequelize, Sequelize);
db.department = require("./department.model")(sequelize, Sequelize);
db.designation = require("./designation.model")(sequelize, Sequelize);


module.exports = db;