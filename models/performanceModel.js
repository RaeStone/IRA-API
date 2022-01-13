module.exports = (sequelize, DataTypes) => {
     
    const Performance = sequelize.define('performance', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        change: {
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
    return Performance;
}