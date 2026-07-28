import { ICustomerQuery, ICustomerResponse } from "../../models/CustomerModal/CustomerModal";
import { getAllCustomerRepo } from "../../repositories/customerRepository";

const getAllCustomerService = async (data: ICustomerQuery): Promise<ICustomerResponse> => {
    try {
        const customers = await getAllCustomerRepo(data);
        return customers;
    } catch (error) {
        throw error;
    }
};

export default getAllCustomerService;