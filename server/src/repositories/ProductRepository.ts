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

    const pipelineStages = [
        {
            $addFields: {
                categoryObjectId: {
                    $convert: {
                        input: '$categoryId',
                        to: 'objectId',
                        onError: null,
                        onNull: null
                    }
                }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryObjectId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: {
                path: '$category',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: filter
        },
        {
            $project: {
                _id: 1,
                productName: 1,
                sku: 1,
                // categoryId: 1,
                category: 1,
                barcode: 1,
                price: 1,
                stockQuantity: 1,
                description: 1,
                createdBy: 1,
                updatedBy: 1,
                createdAt: 1,
                updatedAt: 1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ];

    const products = await Product.aggregate(pipelineStages);
    const total = await Product.countDocuments(filter);

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        products
    };

}

export const editProductRepo = async (productId: string, data: Partial<IProduct>): Promise<IProduct | null> => {
    const product = await Product.findById(productId)
    if (!product) {
        return null
    }

    if (data.stockQuantity && data.stockQuantity > 20) {
        product.stockAlert = "in_stock";
    }
    else if (data.stockQuantity && data.stockQuantity <= 20 && data.stockQuantity >= 1) {
        product.stockAlert = "low_stock";
    }
    else {
        product.stockAlert = "out_of_stock";
    }
    return await product.save();
}

export const getProductByIdRepo = async (productId: string): Promise<IProduct | null> => {

    const product = await Product.findById(productId);

    if (!product) {
        return null;
    }

    return product;
}