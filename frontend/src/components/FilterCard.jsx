import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

function FilterCard() {
    const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  const fitlerData = [
    {
      fitlerType: "Location",
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
      fitlerType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
      fitlerType: "Salary",
      array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-lg m-2">Filter Job</h1>
      <hr className="mt-5" />
      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="relative"
      >
        {fitlerData.map((data, index) => (
          <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}/>
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
