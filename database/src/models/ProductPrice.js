module.exports = (sequelize, DataTypes) => {
    const ProductPrice = sequelize.define('ProductPrice', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      buyingPrice:      DataTypes.INTEGER,
      previousPrice:    DataTypes.INTEGER,
      discount:         DataTypes.INTEGER,
    })
    ProductPrice.associate = function (models) {
      ProductPrice.belongsTo(models.Product)
    }
    return ProductPrice
  }