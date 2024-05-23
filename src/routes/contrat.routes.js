import { Router } from "express";
import {
  getContracts,
  createContract,
  updateContractById,
  deleteContractById,
  getContractById,
  getActiveContractsByCustomer,
  getAvailableProperties,
} from "../controllers/contract.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getContracts);

router.get("/:contractId", getContractById);

router.get('/report/active-contracts', getActiveContractsByCustomer);

router.get('/report/available-properties', getAvailableProperties);

router.post("/", [verifyToken], createContract);

router.put("/:contractId", [verifyToken, isModerator], updateContractById);

router.delete("/:contractId", [verifyToken, isAdmin], deleteContractById);

export default router;
