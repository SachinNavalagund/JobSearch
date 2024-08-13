import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLY_JOB_API_END_POINT, BASIC_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}${APPLY_JOB_API_END_POINT}/get`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          dispatch(setAllAppliedJobs(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
};

export default useGetAppliedJob;
