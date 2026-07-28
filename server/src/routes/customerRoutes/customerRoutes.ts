import { Router } from "express";
import addCustomerValidation from "../../validations/customerValidation/addCustomerValidation";
import { addCustomerController } from "../../controllers/CustomerController/CustomerController";

const router = Router();

router.post('/add', addCustomerValidation, addCustomerController);

export default router;