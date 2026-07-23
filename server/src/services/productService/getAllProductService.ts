import { IProduct, IProductQuery } from "../../models/ProductModal/Product";
import { getProductsRepo } from "../../repositories/ProductRepository";



const getAllProductService = async (query: IProductQuery): Promise<IProduct[]> => {

    const { page, pageSize, search } = query

    const products = await getProductsRepo({ page, pageSize, search });

    return products

}

export default getAllProductService