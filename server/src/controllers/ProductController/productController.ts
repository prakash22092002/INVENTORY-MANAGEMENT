
import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseHelper";
import addProductService from "../../services/productService/addProductService";


export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productName, sku, category, barcode, price, stockQuantity, description } = req.body;
        const product = await addProductService({ productName, sku, category, barcode, price, stockQuantity, description });
        sendSuccessResponse(res, 201, 'Product added successfully', {
            product
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}
