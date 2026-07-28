import { Router } from "express";
import { addCustomerController, getAllCustomerController } from "../../controllers/CustomerController/CustomerController";
import { addCustomerValidation } from "../../validations/customerValidation/addCustomerValidation";

const router = Router();

router.post('/', getAllCustomerController);
router.post('/add', addCustomerValidation, addCustomerController);

export default router;