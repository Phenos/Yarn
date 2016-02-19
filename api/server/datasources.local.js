module.exports = {
    "db": {
        "connector": "postgresql",
        "name": "db",
        "host": process.env.POSTGRES_host,
        "port": process.env.POSTGRES_port,
        "database": process.env.POSTGRES_database,
        "username": process.env.POSTGRES_user,
        "password": process.env.POSTGRES_password,
        "debug": true,
        "ssl": true
    }
}
