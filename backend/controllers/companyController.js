import { Company } from "../models/companyModel.js";
import { User } from "../models/userModel.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      res.status(400).json({
        message: "Company name is required",
      });
    }

    const userID = req.user._id;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({
        message: "Please login first",
      });
    }

    if (user.role === "student") {
      return res.status(400).json({
        message: "You are not authorized to create company",
      });
    }

    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company name already exist",
      });
    }

    const newCompany = new Company({
      name: companyName,
      userId: req.user._id,
    });

    await newCompany.save();

    return res.status(201).json({
      message: "Company registered successfully.",
      newCompany,
    });
  } catch (error) {
    console.log(`Error in register company: ${error.message}`);
   return res.status(500).json({
     error: error,
   });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.user._id;

    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
      });
    }
    return res.status(201).json(companies);
  } catch (error) {
    console.log(`Error in getCompany : ${error.message}`);
   return res.status(500).json({
     error: error,
   });
  }
};

export const getCopmanyByID = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await Company.findById(companyID);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    return res.status(200).json(company);
  } catch (error) {
    console.log(`Error in getCopmanyByID : ${error.message}`);
   return res.status(500).json({
     error: error,
   });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      res.status(400).json({
        message: "Company not found",
      });
    }

    return res
      .status(201)
      .json({ message: "Company updated successfully", company });
  } catch (error) {
    console.log(`Error in updateCompany : ${error.message}`);
   return res.status(500).json({
     error: error,
   });
  }
};
