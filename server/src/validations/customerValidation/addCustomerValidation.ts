import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../../utils/responseHelper";



const addCustomerValidation = (req: Request, res: Response, next: NextFunction) => {
    const { customerName, mobileNumber, email, companyName, address, country, state, city, pinCode, pan } = req.body;

    if (!customerName || typeof customerName !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid name");
        return;
    }

    if (!email || typeof email !== 'string' || email.length < 3 || email.length > 50) {
        sendErrorResponse(res, 400, "Please provide a valid email");
        return;
    }

    if (mobileNumber && typeof mobileNumber !== 'number' || mobileNumber?.toString().length < 10 || mobileNumber?.toString().length > 15) {
        sendErrorResponse(res, 400, "Please provide a valid phone number");
        return;
    }

    if (!companyName) {
        sendErrorResponse(res, 400, "Please provide a valid company name");
        return;
    }

    if (!address || typeof address !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid address");
        return;
    }

    if (!country || typeof country !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid country");
        return;
    }

    if (!state || typeof state !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid state");
        return;
    }

    if (!city || typeof city !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid city");
        return;
    }

    if (!pinCode || typeof pinCode !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid pin code");
        return;
    }

    if (!pan) {
        sendErrorResponse(res, 400, "Please provide a valid pan card number");
        return;
    }

    next();
}

const getCustomerValidation = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.length !== 24) {
        sendErrorResponse(res, 400, "Please provide a valid customer ID");
        return;
    }

    next();
}

const updateCustomerValidation = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.length !== 24) {
        sendErrorResponse(res, 400, "Please provide a valid customer ID");
        return;
    }

    next();
}

const deleteCustomerValidation = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string' || id.length !== 24) {
        sendErrorResponse(res, 400, "Please provide a valid customer ID");
        return;
    }

    next();
}

const getAllCustomerValidation = (req: Request, res: Response, next: NextFunction) => {

    next();
}

export default addCustomerValidation;