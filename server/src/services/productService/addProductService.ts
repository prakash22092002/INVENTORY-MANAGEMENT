import { IProduct, Product } from "../../models/ProductModal/Product";
import { createProductRepo } from "../../repositories/ProductRepository";

const addProductService = async (data: Partial<IProduct>): Promise<IProduct> => {

    const { productName, sku, categoryId, barcode, price, stockQuantity, description, createdBy, updatedBy } = data;

    if (productName === undefined || sku === undefined || categoryId === undefined || barcode === undefined || price === undefined || stockQuantity === undefined || description === undefined) {
        throw new Error("Please provide all the fields");
    }

    if (typeof productName !== 'string' || typeof sku !== 'string' || typeof categoryId !== 'string' || typeof barcode !== 'string' || typeof price !== 'number' || typeof stockQuantity !== 'number' || typeof description !== 'string') {
        throw new Error("Please provide valid data");
    }

    const savedProduct = await createProductRepo({
        productName,
        sku,
        categoryId,
        barcode,
        price,
        stockQuantity,
        description,
        createdBy,
        updatedBy
    } as IProduct);

    return savedProduct;
}

export default addProductService;