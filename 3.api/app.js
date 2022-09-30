require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const http = require('http');
const { MONGO } = require("./configs/config");

// connect ke database mongoDB
mongoose.connect(process.env.MONGO_URI,{ 
    useNewUrlParser: MONGO.options.useNewUrlParser,
    useUnifiedTopology: MONGO.options.useUnifiedTopology,
});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

const hostname = process.env.SERVER_HOSTNAME;
const port = process.env.SERVER_PORT;

app.use(indexRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


module.exports = app;
