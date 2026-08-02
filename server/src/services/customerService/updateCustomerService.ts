import { updateCustomerByIdRepo } from "../../repositories/customerRepository";

export const updateCustomerService = async (customerId: string, data: any) => {
    if (!customerId) {
        throw new Error("Customer ID is required");
    }
    const customer = await updateCustomerByIdRepo(customerId, data);
    return customer;
};

export default updateCustomerService;
