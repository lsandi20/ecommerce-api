var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileupload = require('express-fileupload');
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_NO_SQL_URL).catch(err => console.error(err))


var indexRouter = require('./routes/index');

var app = express();

app.use(fileupload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
