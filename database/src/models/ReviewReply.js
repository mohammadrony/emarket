module.exports = (sequelize, DataTypes) => {
    const ReviewReply = sequelize.define('ReviewReply', {
      id: {
        type:           DataTypes.INTEGER,
        allowNull:      false,
        primaryKey:     true,
        autoIncrement:  true
      },
      reply:            DataTypes.STRING,
      image1:           DataTypes.STRING
    })
    ReviewReply.associate = function (models) {
      ReviewReply.belongsTo(models.Review)
    }
    return ReviewReply
  }