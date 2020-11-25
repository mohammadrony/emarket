module.exports = (sequelize , DataTypes) => {
    const Product = sequelize.define('Product', {
        title:          DataTypes.STRING,
        description:    DataTypes.TEXT,
        price:          DataTypes.INTEGER,
        tags:           DataTypes.STRING,
        image:          DataTypes.STRING
    })
    Product.associate = function (models) {
        Product.belongsTo(models.Category)
        Product.belongsTo(models.SubCategory)
    }
    return Product
}