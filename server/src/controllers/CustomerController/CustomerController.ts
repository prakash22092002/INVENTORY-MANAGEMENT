import { NextFunction, Request, Response } from "express";
import addCustomerService from "../../services/customerService/addCustomerService";
import getAllCustomerService from "../../services/customerService/getAllCustomerService";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseHelper";
import { getSingleCustomerService } from "../../services/customerService/getSingleCustomerService";

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
export const getSingleCustomerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { customerId } = req.params;

        if (!customerId || typeof customerId !== "string") {
            sendErrorResponse(res, 400, "Customer ID is required");
            return;
        }

        const customer = await getSingleCustomerService(customerId);
        sendSuccessResponse(res, 200, "Customer fetched successfully", { customer });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        sendErrorResponse(res, 400, message);
    }
};
