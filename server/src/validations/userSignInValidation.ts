import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/responseHelper';

const userSignInValidation = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        sendErrorResponse(res, 400, 'Please provide a valid email address');
        return;
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        sendErrorResponse(res, 400, 'Password must be at least 6 characters long');
        return;
    }

    next();
};

export default userSignInValidation;