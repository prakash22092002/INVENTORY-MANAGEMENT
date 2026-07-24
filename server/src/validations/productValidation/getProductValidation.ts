import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../../utils/responseHelper";


const getAllProductvalidation = (req: Request, res: Response, next: NextFunction) => {

    const { page, pageSize, search } = req.body;

    if (page < 0 || typeof page !== 'number') {
        sendErrorResponse(res, 400, 'Please provide a valid page');
        return;
    }

    if (!pageSize || typeof pageSize !== 'number' || pageSize < 0) {
        sendErrorResponse(res, 400, 'Please provide a valid page size');
        return;
    }

    if (search && typeof search !== 'string') {
        sendErrorResponse(res, 400, 'Please provide a valid search query');
        return;
    }

    next();
}

export default getAllProductvalidation