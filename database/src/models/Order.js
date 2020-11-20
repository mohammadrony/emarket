module.exports = (sequelize , DataTypes) => {
    const Order = sequelize.define('Order', {
        status:         DataTypes.STRING,
        invoiceNumber:  DataTypes.STRING,
        
    })
    Order.associate (db => {
        Order.belongsTo(db.User)
    })
    return Order
}