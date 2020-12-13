module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    sales: DataTypes.INTEGER, //newly added
    tags: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  })
  Product.associate = function (models) {
    Product.belongsTo(models.Category)
    Product.belongsTo(models.SubCategory)
    Product.belongsTo(models.SubSubCategory)
  }
  return Product
}