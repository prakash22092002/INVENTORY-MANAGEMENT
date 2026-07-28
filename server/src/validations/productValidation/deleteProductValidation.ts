import { NextFunction, Request, Response } from "express";




export const deleteProductValidation = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    next()

}