import { setAllCompany } from "@/redux/companySlice";
import { BASIC_URL, COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${BASIC_URL}${COMPANY_API_END_POINT}/get`,
          { withCredentials: true }
        );

        if (response.status === 201) {
          dispatch(setAllCompany(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
