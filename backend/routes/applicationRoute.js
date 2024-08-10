import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.route("/apply/:id").post(protectRoute, applyJob);
router.route("/get").get(protectRoute, getAppliedJobs);
router.route("/:id/applicants").get(protectRoute, getApplicants);
router.route("/status/:id/update").patch(protectRoute, updateStatus);

export default router;
