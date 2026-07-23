import { getProductByIdRepo } from "../../repositories/ProductRepository"


const getProductByIdService = async (productId: string) => {
    try {

        const particularProduct = await getProductByIdRepo(productId);
        return particularProduct

    } catch (err) {
        throw err;
    }
}

export default getProductByIdService;