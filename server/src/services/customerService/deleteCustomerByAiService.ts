import { deleteCustomerByIdRepo } from "../../repositories/customerRepository";

export const deleteCustomerByIdService = async (customerId: string) => {

    if (!customerId) {
        throw new Error("Customer ID is required");
    }

    const customer = await deleteCustomerByIdRepo(customerId);
    return customer

} 