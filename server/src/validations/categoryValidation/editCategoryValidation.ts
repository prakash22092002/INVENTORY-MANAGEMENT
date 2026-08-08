import { NextFunction, Request, Response } from "express";
import { sendErrorResponse } from "../../utils/responseHelper";


const editCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const { _id, categoryName, slug, description, createdAt, updatedAt } = req.body

    if (!_id || typeof _id !== 'string' || _id.trim().length === 0) {
        sendErrorResponse(res, 400, "Please provide a valid Category ID");
        return;
    }

    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length === 0) {
        sendErrorResponse(res, 400, "Please provide a valid category name");
        return;
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
        sendErrorResponse(res, 400, "Please provide a valid Slug")
        return;
    }

    if (createdAt) {
        if (typeof createdAt !== 'string' || createdAt.trim().length === 0) {
            sendErrorResponse(res, 400, "Please provide a valid CreatedAt")
            return;
        }

        const validDate = !isNaN(Date.parse(createdAt))

        if (!validDate) {
            sendErrorResponse(res, 400, "Please provide a valid CreatedAt Date")
            return;
        }
    }

    if (updatedAt) {
        if (typeof updatedAt !== 'string' || updatedAt.trim().length === 0) {
            sendErrorResponse(res, 400, "Please provide a valid UpdatedAt")
            return;
        }
        const validDate = !isNaN(Date.parse(updatedAt))

        if (!validDate) {
            sendErrorResponse(res, 400, "Please provide a valid UpdatedAt Date")
            return;
        }
    }
    next()
}

export default editCategoryValidation