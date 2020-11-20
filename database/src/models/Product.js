module.exports = (sequelize , DataTypes) => {
    const Product = sequelize.define('Product', {
        title:          DataTypes.STRING,
        description:    DataTypes.TEXT,
        price:          DataTypes.INTEGER,
        tags:           DataTypes.STRING,
        image:          DataTypes.STRING,
        catagory:       DataTypes.STRING,
        subCatagory:    DataTypes.STRING
    })
    return Product
}