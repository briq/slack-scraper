/* eslint-disable import/newline-after-import */
/* eslint-disable global-require */

const path = require('path');

const express = require('express');
const logger = require('morgan');
const compression = require('compression');
const winston = require('winston');

const routes = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-assets')({
  precompile: [
    'app.js',
    'app.css'
  ],
  paths: [
    'assets/css',
    'assets/js'
  ]
}, (mincer) => {
  mincer.environment.appendPath('.');
}));


if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(routes);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(require('errorhandler')());
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  if (!err.status) {
    // unexpected error, log for debugging
    winston.error(err);
  }
  res.sendStatus(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  winston.info(`App listening on port ${PORT}`);
});
