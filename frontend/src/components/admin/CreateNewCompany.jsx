import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASIC_URL, COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateNewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState();

  const { mutate: registerCompany } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${BASIC_URL}${COMPANY_API_END_POINT}/registerCompany`,
          { companyName },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          dispatch(setSingleCompany(response.data.newCompany));
          toast.success(response.data.message);
          const companyId = response?.data?.newCompany?._id;
          navigate(`/admin/companies/${companyId}`);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className=" font-bold text-2xl">GOOGLE</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label className="text-lg font-semibold">Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Google"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button
            className="bg-main-001 hover:bg-main-002"
            onClick={registerCompany}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateNewCompany;
