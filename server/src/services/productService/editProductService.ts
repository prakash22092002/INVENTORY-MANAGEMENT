import { Product } from "../../models/ProductModal/Product";
import { editProductRepo } from "../../repositories/ProductRepository";
import { sendErrorResponse } from "../../utils/responseHelper"

const editProductService = async (productData: any) => {
    try {
        const { productId, productName, sku, category, barcode, price, stockQuantity, description, createdBy, updatedBy } = productData;

        if (!productId || typeof productId !== 'string') {
            throw new Error("Invalid product ID");
        }

        if (!productName || typeof productName !== 'string' || productName.length < 3 || productName.length > 100) {
            throw new Error("Please provide a valid name");
        }

        if (!category || typeof category !== 'string') {
            throw new Error("Please provide a valid category");
        }

        if (!barcode || typeof barcode !== 'string' || barcode.length < 5 || barcode.length > 50) {
            throw new Error("Please provide a valid barcode");
        }

        if (!price || typeof price !== 'number' || price <= 0) {
            throw new Error("Please provide a valid price");
        }

        if (typeof stockQuantity !== 'number' || stockQuantity < 0 || stockQuantity === null || stockQuantity === undefined) {
            throw new Error("Please provide a valid stock quantity");
        }

        if (!description || typeof description !== 'string' || description.length < 3 || description.length > 1000) {
            throw new Error("Please provide a valid description");
        }

        if (!createdBy || typeof createdBy !== 'string') {
            throw new Error("Please provide a valid createdBy");
        }

        if (!updatedBy || typeof updatedBy !== 'string') {
            throw new Error("Please provide a valid updatedBy");
        }

        const product = await editProductRepo(productId, {
            productId,
            productName,
            sku,
            category,
            barcode,
            price,
            stockQuantity,
            description,
            createdBy,
            updatedBy
        })
        if (!product) {
            throw new Error("Product not found")
        }

        const updateProduct = await Product.findByIdAndUpdate(productId, {
            productName,
            sku,
            category,
            barcode,
            price,
            stockQuantity,
            description,
            createdBy,
            updatedBy
        }, { new: true });

        if (!updateProduct) {
            throw new Error("Product not found");
        }

        return updateProduct;

    }
    catch (error: any) {
        throw Error(error.message)
    }
}

export default editProductService;
