import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { BASIC_URL, COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

const CompanyData = () => {
  const { id } = useParams();
  const { singleCompany } = useSelector((store) => store.company);

  useGetCompanyById(id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { isLoading, setLoading } = useState(false);

  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleFileChnage = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const response = await axios.patch(
        `${BASIC_URL}${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Success");
        toast.success(response.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={handleSubmit}>
          <div className="flex-col items-center gap-5">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold">
              <ArrowLeft />
              <span onClick={() => navigate("/admin/companies")}>Back</span>
            </Button>
            <h1 className="text-xl font-bold mt-5">Company Data</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 my-2">
            <div className="">
              <Label className="text-base font-semibold">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChnage}
              />
            </div>
            <div className="">
              <Label className="text-base font-semibold">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChnage}
              />
            </div>
            <div className="">
              <Label className="text-base font-semibold">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={handleInputChnage}
              />
            </div>
            <div className="">
              <Label className="text-base font-semibold">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChnage}
              />
            </div>
            <div className="">
              <Label className="text-base font-semibold">Logo</Label>
              <Input type="file" accept="image/*" onChange={handleFileChnage} />
            </div>
          </div>
          {isLoading ? (
            <Button className="bg-main-001 hover:bg-main-002 w-full mt-8">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              className="bg-main-001 hover:bg-main-002 w-full mt-8"
              type="submit">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanyData;
