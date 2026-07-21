import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../../utils/responseHelper";

const addProductValidation = (req: Request, res: Response, next: NextFunction) => {
    const { productName, sku, category, barcode, price, stockQuantity, description } = req.body;
    if (!productName || typeof productName !== 'string' || productName.length < 3 || productName.length > 100) {
        sendErrorResponse(res, 400, "Please provide a valid name");
        return;
    }

    if (!category || typeof category !== 'string') {
        sendErrorResponse(res, 400, "Please provide a valid category");
        return;
    }

    if (!barcode || typeof barcode !== 'string' || barcode.length < 5 || barcode.length > 50) {
        sendErrorResponse(res, 400, "Please provide a valid barcode");
        return;
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        sendErrorResponse(res, 400, "Please provide a valid price");
        return;
    }

    if (!stockQuantity || typeof stockQuantity !== 'number' || stockQuantity < 0) {
        sendErrorResponse(res, 400, "Please provide a valid stock quantity");
        return;
    }

    if (!description || typeof description !== 'string' || description.length < 3 || description.length > 1000) {
        sendErrorResponse(res, 400, "Please provide a valid description");
        return;
    }

    next();
}

export default addProductValidation;
