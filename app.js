/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
// import router from './server/routes/index';
import '@babel/polyfill';
import userRouter from './server/routes/user';
import defaultRouter from './server/routes/entry';
import tripRouter from './server/routes/trip';
import bookingRouter from './server/routes/bookings';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', userRouter);
app.use('/api/v1', tripRouter);
app.use('/api/v1', bookingRouter);
app.use('/api/v1', defaultRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});

export default app;
