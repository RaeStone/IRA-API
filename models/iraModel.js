module.exports = (sequelize, DataTypes) => {

    const IRA = sequelize.define('ira', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        currentAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        taxRate: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        maturityDate: {
            type: DataTypes.STRING
        },
        rmdDate: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return IRA;
}