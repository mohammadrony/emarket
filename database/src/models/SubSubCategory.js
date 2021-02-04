module.exports = (sequelize, DataTypes) => {
  const SubSubCategory = sequelize.define('SubSubCategory', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    name:             DataTypes.STRING,
  })
  SubSubCategory.associate = function (models) {
    SubSubCategory.belongsTo(models.SubCategory)
  }
  return SubSubCategory
}
