import React from "react";
import { Badge } from "./ui/badge";
import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LatestJobCards({job}) {
  //console.log(job);
  const navigate = useNavigate();
  
  return (
    <div  onClick={()=>navigate(`/description/${job?._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-orange-600 font-bold"} variant={Ghost}>
          {job?.position} Postion
        </Badge>
        <Badge className={"text-blue-600 font-bold"} variant={Ghost}>
  {job?.jobType}
        </Badge>
        <Badge className={"text-violet-600 font-bold"} variant={Ghost}>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
