import express from 'express';
import UserController from '../controllers/users';
import UserValidator from '../middlewares/user';


const { signup, login } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidator, signup);
userRouter.post('/auth/signin', loginValidator, login);
export default userRouter;
