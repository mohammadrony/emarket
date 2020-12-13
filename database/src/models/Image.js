module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  })
  Image.associate = function (models) {
    Image.belongsTo(models.User)
    Image.belongsTo(models.Product)
  }
  return Image
}
