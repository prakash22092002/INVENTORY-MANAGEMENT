import { IProduct, Product } from "../../models/ProductModal/Product";
import { createProductRepo } from "../../repositories/ProductRepository";

const addProductService = async (data: Partial<IProduct>): Promise<IProduct> => {

    const { productName, sku, category, barcode, price, stockQuantity, description } = data;

    if (productName === undefined || sku === undefined || category === undefined || barcode === undefined || price === undefined || stockQuantity === undefined || description === undefined) {
        throw new Error("Please provide all the fields");
    }

    if (typeof productName !== 'string' || typeof sku !== 'string' || typeof category !== 'string' || typeof barcode !== 'string' || typeof price !== 'number' || typeof stockQuantity !== 'number' || typeof description !== 'string') {
        throw new Error("Please provide valid data");
    }

    const savedProduct = await createProductRepo({
        productName,
        sku,
        category,
        barcode,
        price,
        stockQuantity,
        description
    } as IProduct);

    return savedProduct;
}

export default addProductService;