import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/responseHelper';

/**
 * Middleware to validate register/creation request body parameters.
 */
export const userSignUpValidation = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        sendErrorResponse(res, 400, 'Name must be a valid, non-empty string');
        return;
    }

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
