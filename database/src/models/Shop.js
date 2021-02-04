module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
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
    code:             DataTypes.STRING,
    header:           DataTypes.STRING,
    subTitle:         DataTypes.STRING,
    details:          DataTypes.TEXT,
    location:         DataTypes.STRING,
  })
  return Shop
}