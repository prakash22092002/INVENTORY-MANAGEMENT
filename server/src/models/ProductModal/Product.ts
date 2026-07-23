


import { Schema, model, Document } from "mongoose";


export interface IProductQuery {
    page: number;
    pageSize: number;
    search?: string
}

export interface IProduct extends Document {
    productName: string,
    sku: string,
    category: string,
    barcode: string,
    price: number,
    stockQuantity: number,
    description?: string,
    stockAlert?: string
}

const ProductSchema = new Schema<IProduct>(
    {
        productName: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        sku: {
            type: String,
            required: [true, 'SKU is required'],
            trim: true
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true
        },
        barcode: {
            type: String,
            required: [true, 'Barcode is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required']
        },
        stockQuantity: {
            type: Number,
            required: [true, 'Stock Quantity is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        stockAlert: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const Product = model<IProduct>('Product', ProductSchema);