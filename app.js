/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import '@babel/polyfill';
import docs from './swagger.json';
import defaultRouter from './server/routes/entry';
import userRouter from './server/routes/user';
import tripRouter from './server/routes/trip';
import bookingRouter from './server/routes/bookings';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API ROUTES
app.use('/api/v1', userRouter);
app.use('/api/v1', tripRouter);
app.use('/api/v1', bookingRouter);
app.use('/api/v1', defaultRouter);

// HOME ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to your one-stop transportation booking site ....',
  });
});

//
app.use('/docs', swagger.serve, swagger.setup(docs));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});

export default app;
