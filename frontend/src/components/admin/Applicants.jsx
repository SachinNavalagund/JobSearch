import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLY_JOB_API_END_POINT, BASIC_URL } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}${APPLY_JOB_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          dispatch(setAllApplicants(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplications();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <p className="text-xl font-bold my-5">
          Applicants ({applicants.applications.length})
        </p>
        <ApplicantsTable />
      </div>
    </>
  );
};

export default Applicants;
