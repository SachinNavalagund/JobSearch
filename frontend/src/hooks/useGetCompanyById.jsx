import { setSingleCompany } from "@/redux/companySlice";
import { BASIC_URL, COMPANY_API_END_POINT } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();

  const { mutate: getSingleCompany } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${COMPANY_API_END_POINT}/get/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setSingleCompany(data));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    getSingleCompany();
  }, [getSingleCompany, id, dispatch]);
};

export default useGetCompanyById;
