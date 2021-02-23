module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    name:             DataTypes.STRING,
    email:            DataTypes.STRING,
    phoneNo:          DataTypes.STRING,
    icon:             DataTypes.STRING,
    logo:             DataTypes.STRING,
    code:             DataTypes.STRING,
    header:           DataTypes.STRING,
    motive:           DataTypes.STRING,
    details:          DataTypes.TEXT,
    location:         DataTypes.STRING,
  })
  return Company
}