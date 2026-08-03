import { NextFunction, Response, Request } from "express";
import { sendErrorResponse } from "../../utils/responseHelper";




const addCategoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, slug, description, } = req.body

    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length === 0) {
        sendErrorResponse(res, 400, "Please provide a valid category name");
        return;
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
        sendErrorResponse(res, 400, "Please provide a valid Slug")
        return;
    }

    next()
}

export default addCategoryValidation