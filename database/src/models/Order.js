module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.STRING,
    invoiceNumber: DataTypes.STRING,

  })
  Order.associate(db => {
    Order.belongsTo(db.User)
  })
  return Order
}