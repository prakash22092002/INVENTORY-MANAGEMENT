
import { Request, Response, NextFunction } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseHelper";
import addProductService from "../../services/productService/addProductService";
import getAllProductService from "../../services/productService/getAllProductService";
import getProductByIdService from "../../services/productService/getProductByIdService";
import editProductService from "../../services/productService/editProductService";
import { deleteProductService } from "../../services/productService/deleteProductService";


export const addProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productName, sku, category, barcode, price, stockQuantity, description, createdBy, updatedBy } = req.body;
        const product = await addProductService({ productName, sku, category, barcode, price, stockQuantity, description, createdBy, updatedBy });
        sendSuccessResponse(res, 201, 'Product added successfully', {
            product
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}

export const editProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, productName, sku, category, barcode, price, stockQuantity, description, createdBy, updatedBy } = req.body
        const product = await editProductService(req.body)
        sendSuccessResponse(res, 200, 'Product updated successfully', {
            product
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}


export const getProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { page, pageSize, search } = req.body;

        const products = await getAllProductService({ page, pageSize, search });
        sendSuccessResponse(res, 200, 'Products fetched successfully', products);

    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}

export const getProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { productId } = req.params;

        if (!productId || typeof productId !== 'string') {
            sendErrorResponse(res, 400, 'Product ID is required');
            return;
        }

        const product = await getProductByIdService(productId);

        if (!product) {
            sendErrorResponse(res, 404, 'Product not found');
            return;
        }

        sendSuccessResponse(res, 200, 'Product fetched successfully', {
            product
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;

        if (!productId || typeof productId !== 'string') {
            sendErrorResponse(res, 400, 'Product ID is required');
            return;
        }

        const product = await deleteProductService(productId);
        sendSuccessResponse(res, 200, 'Product deleted successfully', {
            product
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        sendErrorResponse(res, 400, message);
    }
}