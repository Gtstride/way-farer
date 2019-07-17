import express from 'express';
import UserController from '../controllers/userController';
import UserValidator from '../middlewares/userValidation';


const { signup, signin } = UserController;
const { signUpValidator, signinValidator } = UserValidator;

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidator, signup);
userRouter.post('/auth/signin', signinValidator, signin);
export default userRouter;
