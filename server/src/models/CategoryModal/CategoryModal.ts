import { Document, model, Schema } from "mongoose";

export interface categoryData {
    categoryName: string;
    slug: string;
    description?: string;
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
        timestamps: true,
        versionKey: false
    }
)

export const Category = model<Icategory>('Category', CategorySchema);