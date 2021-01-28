module.exports = (sequelize, DataTypes) => {
  const ReviewReply = sequelize.define('ReviewReply', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment: DataTypes.STRING,
  })
  ReviewReply.associate = function (models) {
    ReviewReply.belongsTo(models.User)
    ReviewReply.belongsTo(models.Review)
  }
  return ReviewReply
}