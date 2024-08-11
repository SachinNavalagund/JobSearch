import { setAllJobs } from "@/redux/jobSlice";
import { BASIC_URL, JOB_API_END_POINT } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  const { mutate: fetchJobs } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${JOB_API_END_POINT}/getJobs`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setAllJobs(data));
    },
    onError: (error) => {
      console.error("Something went wrong", error);
    },
  });

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
};

export default useGetAllJobs;
