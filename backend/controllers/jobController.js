import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
    } = req.body;

    const userID = req.user._id;
    const user = await User.findById(userID);
    if (user.role === "student") {
      return res.status(400).json({
        message: "You are not authorized person to create job",
      });
    }

    if (
      !title ||
      !description ||
      !salary ||
      !requirements ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experienceLevel),
      position: Number(position),
      createdBy: userID,
      company,
    });

    const newJob = await job.save();

    return res.status(200).json({
      message: "Job has been created successfully",
      newJob,
    });
  } catch (error) {
    console.log(`Error in postJob : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({ path: "company" });

    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.log(`Error in getAllJob : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "applications" });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log(`Error in getJobById : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user._id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(400).json({
        message: "Jobs not found",
      });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.log(`Error in getAdminJobs : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};
