import { Response } from 'express';

/**
 * Send a success response.
 * es: 0 indicates success.
 */
export const sendSuccessResponse = (
    res: Response,
    statusCode: number,
    message: string,
    additionalData: Record<string, any> = {}
): void => {
    res.status(statusCode).json({
        es: 0,
        statusCode,
        data: {
            message,
            ...additionalData
        }
    });
};

/**
 * Send an error response.
 * es: 1 indicates failure.
 */
export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    message: string
): void => {
    res.status(statusCode).json({
        es: 1,
        statusCode,
        data: {
            message
        }
    });
};
