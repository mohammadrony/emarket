module.exports = (sequelize, DataTypes) => {
  const ProductFeedback = sequelize.define('ProductFeedback', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    profit:           DataTypes.INTEGER,
    sales:            DataTypes.INTEGER,
    positiveReview:   DataTypes.INTEGER,
    negativeReview:   DataTypes.INTEGER,
  })
  ProductFeedback.associate = function (models) {
    ProductFeedback.belongsTo(models.Product)
  }
  return ProductFeedback
}