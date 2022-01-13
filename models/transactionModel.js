const { database } = require("pg/lib/defaults")

module.exports = (sequelize, DataTypes) => {

    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iraId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Transaction;
}