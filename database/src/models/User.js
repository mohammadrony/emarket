module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type:             DataTypes.INTEGER,
      allowNull:        false,
      primaryKey:       true,
      autoIncrement:    true
    },
    username: {
      type:             DataTypes.STRING,
      unique:           true
    },
    firstName:          DataTypes.STRING,
    lastName:           DataTypes.STRING,
    profileImage:       DataTypes.STRING,
    registerToken:      DataTypes.STRING,
    email: {
      type:             DataTypes.STRING,
      unique:           true
    },
    phoneNo:            DataTypes.STRING,
    password:           DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    userType:           DataTypes.STRING,
    variant:            DataTypes.STRING,
    priority:           DataTypes.INTEGER,
  })
  User.associate = function (models) {
    User.belongsTo(models.Company)
  }
  return User
}