import express =require('express');
const myConnection = require('express-myconnection');
const session = require('express-session');
var cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import morgan = require('morgan');
var app = express();
var port = process.env.PORT || 3000;
const path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
var mysql=require('mysql');
const customerRoutes = require('./app/routes.pagos');
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
 resave:false,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(flash());

require('./app/routes')(app, passport);

app.use((req, res, next) => {

  app.locals.user = req.user;
  next();
});


app.use(express.static('public'));

app.listen(port);
console.log("Port: " + port);