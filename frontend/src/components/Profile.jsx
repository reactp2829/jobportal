import React,{useState} from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact2, Ghost, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDailog from "./UpdateProfileDailog";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = ()=> {
  useGetAppliedJobs();
  const {user} = useSelector(store=>store.auth);
  // const skillArray = [
  //   "MongoDB",
  //   "React",
  //   "Node js",
  //   "Express Js",
  //   "Javascript",
  // ];
  const skillArray = user?.profile?.skills || [];
  const isResume = true;
  const [open,setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto rounded-2xl bg-white border border-gray-200 my-4 p-10">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage  
              src={user?.profile?.profilePhoto}
              alt={user?.email} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick ={()=>setOpen(true)}className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="w-full mx-auto m-5 p-2">
          <div className="flex items-center gap-4 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 my-2">
            <Contact2 />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 mt-2">
            {skillArray.length != 0 ? (
              skillArray.map((item, index) => (
                <Badge
                  key={index}
                  className={"bg-orange-600 text-white font-bold gap-2"}
                  variant={Ghost}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-bold text-sm">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500w-full cursor-pointer hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Na</span>
          )}
        </div>
      </div>
      {/** applied job table* */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl ">
        <h1 className="font-bold text-lg">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDailog open={open} setOpen={setOpen}/>
      <Footer />
    </div>
  );
}

export default Profile;
