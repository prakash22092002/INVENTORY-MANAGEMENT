import { IProduct, IProductQuery, Product } from "../models/ProductModal/Product";

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

    console.log(product, 'this is the end create new product object---')
    return await product.save();
}

export const getProductsRepo = async (query: IProductQuery): Promise<IProduct[]> => {

    const { page = 0, pageSize = 50, search } = query || {};

    const skip = Number(page) * Number(pageSize);
    const limit = Number(pageSize);

    if (search && search.length > 0) {
        const searchedProducts = await Product.find({
            $or: [
                { productName: { $regex: search, $options: "i" } }
            ]
        }).skip(skip).limit(limit)

        return searchedProducts
    }

    const products = await Product.find().skip(skip).limit(limit);

    return products

}

export const getProductByIdRepo = async (productId: string): Promise<IProduct | null> => {

    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    return product;
}