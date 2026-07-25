import { IProduct, IProductQuery, IProductResponse, Product } from "../models/ProductModal/Product";

/**
 * Creates a new product record in the database.
 * @param data Partial<IProduct> - The product data to save.
 * @returns Promise<IProduct> - The created product.
 */

export const createProductRepo = async (data: IProduct): Promise<IProduct> => {
    const product = new Product(data);

    if (data.stockQuantity > 20) {
        product.stockAlert = "in_stock";
    }
    else if (data.stockQuantity <= 20 && data.stockQuantity >= 1) {
        product.stockAlert = "low_stock";
    }
    else {
        product.stockAlert = "out_of_stock";
    }

    return await product.save();
}

export const getProductsRepo = async (query: IProductQuery): Promise<IProductResponse> => {

    const { page = 0, pageSize = 50, search } = query || {};

    const skip = Number(page) * Number(pageSize);
    const limit = Number(pageSize);

    const filter = (search && search.trim().length > 0)
        ? {
            $or: [
                { productName: { $regex: search, $options: "i" } }
            ]
        }
        : {};

    const products = await Product.find(filter).skip(skip).limit(limit);
    const total = await Product.countDocuments(filter);

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        products
    };

}

export const getProductByIdRepo = async (productId: string): Promise<IProduct | null> => {

    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    return product;
}