import { Document, model, Schema } from "mongoose";

export interface ICustomerQuery {
    page?: number;
    pageSize?: number;
    search?: string;
}

export interface ICustomerResponse {
    page: number;
    pageSize: number;
    total: number;
    customers: ICustomer[];
}

export interface ICustomer extends Document {
    customerName: string;
    mobileNumber: string;
    email: string;
    companyName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    pinCode: string;
    pan: string;
}

const CustomerSchema = new Schema<ICustomer>(
    {
        customerName: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true
        },
        mobileNumber: {
            type: String,
            required: [true, 'Mobile number is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true
        },
        companyName: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true
        },
        address: {
            type: String,
            required: [true, 'Address is required'],
            trim: true
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
            trim: true
        },
        state: {
            type: String,
            required: [true, 'State is required'],
            trim: true
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true
        },
        pinCode: {
            type: String,
            required: [true, 'Pin code is required'],
            trim: true
        },
        pan: {
            type: String,
            required: [true, 'Pan card number is required'],
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Customer = model<ICustomer>('Customer', CustomerSchema);
