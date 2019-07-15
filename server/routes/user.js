import express from 'express';
import UserController from '../controllers/users';
import UserValidator from '../middlewares/user';


const { register, login } = UserController;
const { signUpValidator, loginValidator } = UserValidator;

const userRouter = express.Router();

userRouter.post('/auth/signup', signUpValidator, register);
userRouter.post('/auth/signin', loginValidator, login);
export default userRouter;
