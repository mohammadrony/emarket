module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    name:             DataTypes.STRING,
  })
  SubCategory.associate = function (models) {
    SubCategory.belongsTo(models.Category)
  }
  return SubCategory
}
