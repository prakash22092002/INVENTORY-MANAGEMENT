import { Customer, ICustomer, ICustomerQuery, ICustomerResponse } from "../models/CustomerModal/CustomerModal";

export const createCustomerRepo = async (data: ICustomer) => {
    const { customerName, mobileNumber, email, companyName, address, country, state, city, pinCode, pan } = data;

    const customerPresent = await Customer.findOne({ mobileNumber: mobileNumber });

    if (customerPresent) {
        throw new Error("Customer already exists");
    }

    const customer = new Customer(data);

    return await customer.save();
};

export const getAllCustomerRepo = async (query: ICustomerQuery): Promise<ICustomerResponse> => {
    const { page = 0, pageSize = 50, search } = query || {};

    const skip = Number(page) * Number(pageSize);
    const limit = Number(pageSize);

    const filter = (search && search.trim().length > 0)
        ? {
            $or: [
                { customerName: { $regex: search, $options: "i" } }
            ]
        }
        : {};

    const customers = await Customer.find(filter).skip(skip).limit(limit);
    const total = await Customer.countDocuments(filter);

    return {
        page: Number(page),
        pageSize: Number(pageSize),
        total,
        customers
    };
};

export const getSingleCustomerRepo = (customerId: string) => {

    const customer = Customer.findById(customerId);
    if (!customer) {
        throw new Error("Customer not found");
    }
    return customer;
}