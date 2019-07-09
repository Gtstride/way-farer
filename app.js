/* eslint-disable array-callback-return */
import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';
import 'dotenv/config';
import '@babel/polyfill';


const app = express();

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

module.exports = app;
