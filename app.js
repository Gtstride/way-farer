/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';
import 'dotenv/config';
import '@babel/polyfill';
import auth from './server/auth';


const app = express();

app.use('/auth', auth);
app.use('/users', router);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

const PORT = 5000;
app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}.`);
});

// catch 404 and forward to error handler
app.use((_req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// render the error page
app.use((err, req, res, next) => {
  // res.status(err.status || 5000);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});


module.exports = app;
