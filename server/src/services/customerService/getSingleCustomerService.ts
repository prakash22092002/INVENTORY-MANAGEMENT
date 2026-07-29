import { getSingleCustomerRepo } from "../../repositories/customerRepository";






export const getSingleCustomerService = async (customerId: string) => {

    const customer = await getSingleCustomerRepo(customerId);
    if (!customer) {
        throw new Error("Customer not found");
    }
    return customer;



}