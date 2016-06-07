const express = require('express');
const http = require('http');
const path = require('path');
const passport = require("passport");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const errorhandler = require('errorhandler');

var env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

console.log('Using configuration', config);

require('./config/passport')(passport, config);


var app = express();

app.set('port', config.app.port);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'this shit hits'
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', {error: err});
});
/*
app.use(function (req, res, next) {
  res.status(404);
  if (req.accepts('html')) {
    res.render('404',
      {
        url: req.url
      });
    return;
  }
  if (req.accepts('json')) {
    res.send({error: 'Not found'});
    return;
  }
  res.type('txt').send('Not found');
});
*/

require('./config/routes')(app, config, passport);


app.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
