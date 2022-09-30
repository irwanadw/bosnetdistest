require("dotenv").config();

const MONGO = {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        poolSize: 5
    },
    url: process.env.MONGO_URI
};

const SERVER = {
    hostname: process.env.SERVER_HOSTNAME || 'localhost',
    port: process.env.SERVER_PORT || 5017,
    cors: process.env.CORS || '*',
    disable: process.env.SERVER_DISABLE || false,
    appHost: process.env.APP_HOST,
    appProtocol: process.env.APP_PROTOCOL
};

module.exports = {
    SERVER,
    MONGO
}