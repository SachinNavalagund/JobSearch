import { setAllJobs } from "@/redux/jobSlice";
import { BASIC_URL, JOB_API_END_POINT } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedJob } = useSelector((store) => store.job);

  const { mutate: fetchJobs } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${JOB_API_END_POINT}/getJobs?keyword=${searchedJob}`,
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
