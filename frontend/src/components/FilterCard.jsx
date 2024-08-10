import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bengaluru", "Mysore", "Hydrabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Graphic Designer",
      "Java Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="w-full px-3">
      <p className="text-xl font-bold">Filter Jobs</p>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((item, index) => (
          <div key={index}>
            <p className="text-lg font-bold">{item.filterType}</p>
            {item.array.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={item} />
                <Label>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
