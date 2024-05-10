import { Router } from "express";
import {
  getCustomers,
  createCustomer,
  updateCustomerById,
  deleteCustomerById,
  getCustomerById,
  getCustomerByName,
  getContactInfo,
} from "../controllers/customer.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getCustomers);

router.get("/search", getCustomerByName);

router.get("/directory", getContactInfo);

router.get("/:customerId", getCustomerById);

router.post("/", [verifyToken], createCustomer);

router.put("/:customerId", [verifyToken, isModerator], updateCustomerById);

router.delete("/:customerId", [verifyToken, isAdmin], deleteCustomerById);

export default router;
