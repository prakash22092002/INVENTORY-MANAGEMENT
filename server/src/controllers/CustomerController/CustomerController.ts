import { NextFunction, Request, Response } from "express";
import addCustomerService from "../../services/customerService/addCustomerService";
import getAllCustomerService from "../../services/customerService/getAllCustomerService";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseHelper";

export const addCustomerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await addCustomerService(req.body);
        sendSuccessResponse(res, 201, "Customer added successfully", { customer });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        sendErrorResponse(res, 400, message);
    }
};

export const getAllCustomerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, pageSize, search } = req.body;
        const customers = await getAllCustomerService({ page, pageSize, search });
        sendSuccessResponse(res, 200, "Customers fetched successfully", customers);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        sendErrorResponse(res, 400, message);
    }
};
