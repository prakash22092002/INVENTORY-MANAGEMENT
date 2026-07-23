import { IProduct, IProductQuery, Product } from "../models/ProductModal/Product";

/**
 * Creates a new product record in the database.
 * @param data Partial<IProduct> - The product data to save.
 * @returns Promise<IProduct> - The created product.
 */

export const createProductRepo = async (data: Partial<IProduct>): Promise<IProduct> => {
    const product = new Product(data);
    return await product.save();
}

export const getProductsRepo = async (query: IProductQuery): Promise<IProduct[]> => {

    const { page, pageSize, search } = query;

    const skip = page * pageSize;
    const limit = pageSize

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
    return product;
}