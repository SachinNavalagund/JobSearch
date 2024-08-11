import { setSingleJob } from "@/redux/jobSlice";
import { BASIC_URL, JOB_API_END_POINT } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSingleJob = (jobId) => {
  const dispatch = useDispatch();
  const { mutate: getSingleJob } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${JOB_API_END_POINT}/getjob/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setSingleJob(data));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    getSingleJob();
  }, [getSingleJob]);
};

export default useSingleJob;
