import { Document, model, Schema } from "mongoose";

export interface categoryData {
    _id?: string;
    categoryName: string;
    slug: string;
    description?: string;
    products?: string[];
    productsCount?: number,
    createdAt?: string,
    updatedAt?: string
}

export interface Icategory extends Document {
    categoryName: string;
    slug: string;
    description?: string;
}

const CategorySchema = new Schema<Icategory>(
    {
        categoryName: {
            type: String,
            required: [true, "Category name is required"],
            trim: true
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
            currentTime: () => Date.now()
        },
        versionKey: false
    }
)

export const Category = model<Icategory>('Category', CategorySchema);