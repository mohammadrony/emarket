module.exports = (sequelize, DataTypes) => {
    const ProductAmount = sequelize.define('ProductAmount', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      buyingAmount:      DataTypes.INTEGER,
      previousAmount:    DataTypes.INTEGER,
      discount:         DataTypes.INTEGER,
    })
    ProductAmount.associate = function (models) {
      ProductAmount.belongsTo(models.Product)
    }
    return ProductAmount
  }