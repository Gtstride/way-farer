import express from 'express';

const defaultRouter = express.Router();

/* defaultRouter.get('/', (req, res) => res.status(200).json({
  data: 'Welcome to your one-stop transportation booking site ....',
})); */

defaultRouter.all('*', (req, res) => res.status(404).json({
  error: 'Sorry, page not found!',
}));


export default defaultRouter;
