module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    code:             DataTypes.STRING,
    title:            DataTypes.STRING,
    subtitle:         DataTypes.STRING,
    description:      DataTypes.TEXT,
    amount:           DataTypes.INTEGER,
    rating:           DataTypes.FLOAT,
    peopleRated:      DataTypes.INTEGER,
    currency:         DataTypes.STRING,
    sales:            DataTypes.INTEGER,
    image1:           DataTypes.STRING,
    image2:           DataTypes.STRING,
    image3:           DataTypes.STRING,
    image4:           DataTypes.STRING,
    image5:           DataTypes.STRING,
    image6:           DataTypes.STRING,
    image7:           DataTypes.STRING,
    image8:           DataTypes.STRING,
    image9:           DataTypes.STRING,
    image10:          DataTypes.STRING,
  })
  Product.associate = function (models) {
    Product.belongsTo(models.Category)
    Product.belongsTo(models.SubCategory)
    Product.belongsTo(models.SubSubCategory)
  }
  return Product
}