module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type:             DataTypes.INTEGER,
      allowNull:        false,
      primaryKey:       true,
      autoIncrement:    true
    },
    name:               DataTypes.STRING,
    phoneNo:            DataTypes.STRING,
    email:              DataTypes.STRING,
    address:            DataTypes.STRING,
    status:             DataTypes.STRING,
    variant:            DataTypes.STRING,
    checkoutSessionId:{
      type:             DataTypes.STRING,
    },
    productCost:        DataTypes.INTEGER,
    currency:           DataTypes.STRING,
    shippingCost:       DataTypes.INTEGER,
  })
  return Order
}