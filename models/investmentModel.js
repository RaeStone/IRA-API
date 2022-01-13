module.exports = (sequelize, DataTypes) => {
    const Investment = sequelize.define('investment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        datePurchased: {
            type: DataTypes.STRING,
            allowNull: false
        },
        originalValue: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        iraId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Investment;
}