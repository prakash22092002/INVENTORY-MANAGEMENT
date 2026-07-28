import { ICustomer } from "../../models/CustomerModal/CustomerModal";
import { createCustomerRepo } from "../../repositories/customerRepository";

const addCustomerService = async (data: Partial<ICustomer>): Promise<ICustomer> => {
    const { customerName, mobileNumber, email, companyName, address, country, state, city, pinCode, pan } = data;

    if (!customerName || !mobileNumber || !email || !companyName || !address || !country || !state || !city || !pinCode || !pan) {
        throw new Error("Please provide all required fields");
    }

    const customer = await createCustomerRepo({
        customerName,
        mobileNumber,
        email,
        companyName,
        address,
        country,
        state,
        city,
        pinCode,
        pan
    } as ICustomer);

    return customer;
};

export default addCustomerService;