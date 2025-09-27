module.exports = {
    port: process.env.PORT || 8081,
    db: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        database: process.env.DB_NAME || "emarket",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "12345678",
        dialect: process.env.DIALECT || "mysql",
    },
    authentication: {
        jwtSecret : process.env.JWT_SECRET || 'secret'
    }
}
