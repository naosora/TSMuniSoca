"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var myConnection = require('express-myconnection');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var mysql = require('mysql');
var customerRoutes = require('./app/routes.pagos');
require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'tramitesbd'
}, 'single'));
app.use(session({
    secret: 'justasecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./app/routes')(app, passport);
app.use(function (req, res, next) {
    app.locals.user = req.user;
    next();
});
app.use(express.static('public'));
app.listen(port);
console.log("Port: " + port);
