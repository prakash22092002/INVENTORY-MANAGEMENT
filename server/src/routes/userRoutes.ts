import { Router } from 'express';
import { signUpUser, signInUser } from '../controllers/UserController';
import { userSignUpValidation } from '../validations/userSignUpValidation';
import userSignInValidation from '../validations/userSignInValidation';

const router = Router();

// POST /api/users - Register/Create a new user
router.post('/signup', userSignUpValidation, (req, res, next) => {
    signUpUser(req, res).catch(next);
});

router.post('/signin', userSignInValidation, (req, res, next) => {
    signInUser(req, res).catch(next)
})

export default router;
