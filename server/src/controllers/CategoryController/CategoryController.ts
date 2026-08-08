import { NextFunction, Request, Response } from "express";
import addCategoryService from "../../services/categoryService/addCategoryService";
import { getCategoryService } from "../../services/categoryService/getCategoryService";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responseHelper";
import { deleteCategoryService } from "../../services/categoryService/deleteCategoryService";
import editCategoryService from "../../services/categoryService/editCategoryService";

export const addCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await addCategoryService(req.body);
        sendSuccessResponse(res, 201, "Category added successfully", { category });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to add category";
        sendErrorResponse(res, 400, message);
    }
};

export const getCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await getCategoryService(req.body);
        sendSuccessResponse(res, 200, "Category fetched successfully", { category });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch category";
        sendErrorResponse(res, 400, message);
    }
};

export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { categoryId } = req.params as { categoryId: string }

        const category = await deleteCategoryService(categoryId)
        sendSuccessResponse(res, 200, "Category deleted successfully", { category });

    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Failed to delete category";
        sendErrorResponse(res, 400, message);
    }
}

export const editCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await editCategoryService(req.body)
        sendSuccessResponse(res, 200, "Category updated successfully", { category });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to update category";
        sendErrorResponse(res, 400, message);
    }
}