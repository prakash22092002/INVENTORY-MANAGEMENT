import { IProduct, Product } from "../models/ProductModal/Product";

/**
 * Creates a new product record in the database.
 * @param data Partial<IProduct> - The product data to save.
 * @returns Promise<IProduct> - The created product.
 */

export const createProductRepo = async (data: Partial<IProduct>): Promise<IProduct> => {
    const product = new Product(data);
    return await product.save();
}