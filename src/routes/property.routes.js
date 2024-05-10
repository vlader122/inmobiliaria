import { Router } from "express";
import {
  getPropertys,
  createProperty,
  updatePropertyById,
  deletePropertyById,
  getPropertyById,
  getPropertiesByPrice,
  getPropertyCountByCity,
  getRecentProperties,
} from "../controllers/property.controller.js";
import { verifyToken, isModerator, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getPropertys);

router.get("/price", getPropertiesByPrice);

router.get("/count-by-city", getPropertyCountByCity);

router.get("/recent", getRecentProperties);

router.get("/:propertyId", getPropertyById);

router.post("/", [verifyToken], createProperty);

router.put("/:propertyId", [verifyToken, isModerator], updatePropertyById);

router.delete("/:propertyId", [verifyToken, isAdmin], deletePropertyById);

export default router;
