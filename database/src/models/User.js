module.exports = (sequelize , DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    })
    return User
}