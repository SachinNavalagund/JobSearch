import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req.user._id;
    const jobID = req.params.id;
    if (!jobID) {
      return res.status(400).json({
        message: "Job id is required",
      });
    }

    //check user already applyed for a job
    const existingApplication = await Application.findOne({
      job: jobID,
      applicant: userID,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const job = await Job.findById(jobID);

    if (!job) {
      return res.status(400).json({
        message: "Job not found",
      });
    }

    const newApplication = new Application({
      job: jobID,
      applicant: userID,
    });

    const application = await newApplication.save();

    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
    });
  } catch (error) {
    console.log(`Error in applyJob : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userID = req.user._id;
    const application = await Application.find({ applicant: userID })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Applications",
      });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.log(`Error in getAppliedJobs : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log(`Error in getApplicants : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationID = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const application = await Application.findOne({ _id: applicationID });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      application,
    });
  } catch (error) {
    console.log(`Error in getApplicants : ${error.message}`);
    return res.status(500).json({
      error: error,
    });
  }
};
