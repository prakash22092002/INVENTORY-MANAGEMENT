import { Router } from "express";
import { addCustomerController, getAllCustomerController, getSingleCustomerController } from "../../controllers/CustomerController/CustomerController";
import { addCustomerValidation } from "../../validations/customerValidation/addCustomerValidation";

const router = Router();

router.post('/', getAllCustomerController);
router.post('/add', addCustomerValidation, addCustomerController);
router.get(`/:customerId`, getSingleCustomerController)

export default router;