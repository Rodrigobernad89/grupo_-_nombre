var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const log = require("./Middlewares/aplicacion/log")
const session = require('express-session');
const middSession = require('./Middlewares/aplicacion/session');
let methodOverride = require('method-override');


var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var rolesRouter = require('./routes/roles');
var profilesRouter = require('./routes/profiles');
var cartRouter = require('./routes/cart');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret: 'pagina MJR',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


//Mis Middlewares
app.use(log);
app.use(middSession);


//usamos routers importados arriba
app.use(methodOverride('_method'));
app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/profiles', profilesRouter);
app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;