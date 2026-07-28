import { Customer, ICustomer } from "../models/CustomerModal/CustomerModal";



export const createCustomerRepo = async (data: ICustomer) => {

    const { customerName, mobileNumber, email, companyName, address, country, state, city, pinCode, pan } = data

    const customerPresent = await Customer.findOne({ mobileNumber: mobileNumber });

    if (customerPresent) {
        throw new Error("Customer already exists");
    }

    const customer = new Customer(data);

    return await customer.save();

}