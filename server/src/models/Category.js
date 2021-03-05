module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type:           DataTypes.INTEGER,
      allowNull:      false,
      primaryKey:     true,
      autoIncrement:  true
    },
    name: {
      type:           DataTypes.STRING,
      unique:         true
    }
  })
  return Category
}
