import express from 'express';

const defaultRouter = express.Router();

defaultRouter.get('/api/v1/', (req, res) => res.status(200).json({
  data: 'Welcome message ....',
}));

defaultRouter.all('*', (req, res) => res.status(404).json({
  error: 'Sorry, page not found!',
}));


export default defaultRouter;
