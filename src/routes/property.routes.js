import { Router } from "express";
import {
  getPropertys,
  createProperty,
  updatePropertyById,
  deletePropertyById,
  getPropertyById,
} from "../controllers/property.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getPropertys);

router.get("/:propertyId", getPropertyById);

router.post("/", [verifyToken], createProperty);

router.put("/:propertyId", [verifyToken, isModerator], updatePropertyById);

router.delete("/:propertyId", [verifyToken, isAdmin], deletePropertyById);

export default router;
