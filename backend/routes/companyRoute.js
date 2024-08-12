import express from "express";
import {
  getCompany,
  getCopmanyByID,
  registerCompany,
  updateCompany,
} from "../controllers/companyController.js";
import { protectRoute } from "../middleware/protectedRoute.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/registerCompany").post(protectRoute, registerCompany);
router.route("/get").get(protectRoute, getCompany);
router.route("/get/:id").get(protectRoute, getCopmanyByID);
router.route("/update/:id").patch(protectRoute, singleUpload, updateCompany);

export default router;
