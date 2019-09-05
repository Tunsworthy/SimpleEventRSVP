var express = require('express'),
  app = express(),
  port = process.env.PORT,
  mongoose = require('mongoose'),
  //User = require('./models/usermodel'), //created model loading here
  bodyParser = require('body-parser');
  createError = require('http-errors');
  express = require('express');
  path = require('path');
  Router = require('./routes/allroutes');
  flash = require('express-flash');
  cookieParser = require('cookie-parser');
  session = require('express-session');
 

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/eventsdb', {useNewUrlParser: true}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
//var auth = require('./api/middleware/auth');
app.set('view engine', 'pug');
//app.use(auth);

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());

Router(app); //register the route

app.use('/stylesheets', express.static(__dirname + '/public/stylesheets')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RSVP APP Started: ' + port);