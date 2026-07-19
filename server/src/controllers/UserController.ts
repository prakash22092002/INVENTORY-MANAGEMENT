import { Request, Response } from 'express';
import { createUserService, signInUserService } from '../services/UserService';
import generateAccessToken from '../utils/generateAccessToken';
import { sendSuccessResponse, sendErrorResponse } from '../utils/responseHelper';

/**
 * Handle HTTP request for creating/registering a new user.
 */
export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Delegate to service layer
        const user = await createUserService({ name, email, password });
        const accessToken = generateAccessToken({ id: user._id.toString(), name: user.name, email: user.email, password: user.password })

        // Send back success response (excluding password)
        sendSuccessResponse(res, 201, 'User created successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                accessToken
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';

        // Check for specific duplicate email error or return general bad request
        if (message.includes('already registered')) {
            sendErrorResponse(res, 409, message);
            return;
        }

        sendErrorResponse(res, 400, message);
    }
};

export const signInUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await signInUserService(email, password);

        if (!user) {
            sendSuccessResponse(res, 200, 'User not found', { user: null });
            return;
        }

        const accessToken = generateAccessToken({ id: user._id.toString(), name: user.name, email: user.email, password: user.password });

        sendSuccessResponse(res, 200, 'User logged in successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                accessToken
            }
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';

        // Check for specific duplicate email error or return general bad request
        if (message.includes('already registered')) {
            sendErrorResponse(res, 409, message);
            return;
        }

        sendErrorResponse(res, 400, message);
    }
}


