import { Router } from "express";
import { addCustomerController, deleteCustomerByAiController, getAllCustomerController, getSingleCustomerController, updateCustomerController } from "../../controllers/CustomerController/CustomerController";
import { addCustomerValidation } from "../../validations/customerValidation/addCustomerValidation";

const router = Router();

router.post('/', getAllCustomerController);
router.post('/add', addCustomerValidation, addCustomerController);
router.post('/edit', updateCustomerController);
router.get(`/:customerId`, getSingleCustomerController);
router.get(`/delete/:customerId`, deleteCustomerByAiController);

export default router;