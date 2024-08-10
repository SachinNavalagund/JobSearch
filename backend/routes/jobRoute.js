import express from "express";
import { protectRoute } from "../middleware/protectedRoute.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/createJob").post(protectRoute, postJob);
router.route("/getJobs").get(protectRoute, getAllJobs);
router.route("/getAdminJobs").get(protectRoute, getAdminJobs);
router.route("/getjob/:id").get(protectRoute, getJobById);

export default router;
