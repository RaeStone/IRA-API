const dbConfig = require('../dbconfig');

const { Sequelize, DataTypes } = require('sequelize');

// construct the sequelize object using the constructor
let sequelize = null;

    if (process && process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
                }
              }
            }
        );
    } else {
       sequelize = new Sequelize(
        { // use imported configurations from dbConfig
            database: databaseConfig.DB,
            username: databaseConfig.USER,
            password: databaseConfig.PASSWORD,
            dialect: databaseConfig.dialect,
            host: databaseConfig.HOST,
        })
    }

const db = {}
db.sequelize = sequelize;

db.IRAs = require('./iraModel')(sequelize, DataTypes);
db.Investments = require('./investmentModel')(sequelize, DataTypes);
db.Transactions = require('./transactionModel')(sequelize, DataTypes);
db.Performances = require('./performanceModel')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log('**DB synced with sequelize**');
}).catch((error) => {
    console.log('**Error syncing the DB to sequelize** : ' + error );
})

sequelize.authenticate()
.then(() => { // successfully connected to DB
    console.log("**connected to Postgres DB**");
})
.catch(e => {// failed connecting to DB
    console.log('**unable to connect to Postgres DB** : ' + e);
 });

db.Investments.belongsTo(db.IRAs);
db.Transactions.belongsTo(db.IRAs);
db.Performances.belongsTo(db.IRAs);
db.IRAs.hasMany(db.Investments);
db.IRAs.hasMany(db.Transactions);
db.IRAs.hasMany(db.Performances);

module.exports = db;