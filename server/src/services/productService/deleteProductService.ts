import { Product } from "../../models/ProductModal/Product";

export const deleteProductService = async (productId: string) => {
    try {

        const product = await Product.findByIdAndDelete(productId);
        return product;

    } catch (error: any) {

        throw new Error(error.message);

    }
}