module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    quantity:         DataTypes.INTEGER
  })
  Cart.associate = function (models) {
    Cart.belongsTo(models.User)
    Cart.belongsTo(models.Product)
  }
  return Cart
}
