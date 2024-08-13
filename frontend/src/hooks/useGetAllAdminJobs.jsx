import { setAllAdminJob } from "@/redux/jobSlice";
import { BASIC_URL, JOB_API_END_POINT } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  const { mutate: fetchAdminJobs } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${JOB_API_END_POINT}/getAdminJobs`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setAllAdminJob(data));
    },
    onError: (error) => {
      console.error("Something went wrong", error);
    },
  });

  useEffect(() => {
    fetchAdminJobs();
  }, [fetchAdminJobs]);
};

export default useGetAllAdminJobs;
