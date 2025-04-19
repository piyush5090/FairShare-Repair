import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TripDetailsSkeleton from "./tripDetailsSkeleton";
import { useLocation } from "react-router-dom";
import IndiMember from "./indiMemberNew";
import { FcAbout } from "react-icons/fc";
import { IoIosAddCircle } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";
import axiosInstance from "../../utils/axiosInstance";
import AddMembers from "./addMembersNew";
import IndiMemberSkeleton from "./indiMemberSkeleton";


const Members = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const[isLoading,setIsLoading]=useState(false);
    const[tripDetails,setTripDetails] = useState(null);
    const[error,setError]=useState(null);
    const[showUserModal,setShowUsersModal]=useState(false);

    const { tripData } = location.state || {};

    const back = () =>{
        navigate(-1);
    }

    const handleUsers = () =>{
    setShowUsersModal(!showUserModal);
    }


    const isLongTripname = tripDetails?.tripname.length > 12;

    const getTripDetails = async () =>{
        console.log("hello");
        setIsLoading(true);
        try{
            const _id = tripData.TripId;
            const response = await axiosInstance.get(`/getTrip/${_id}`);
            console.log(response);
            setTripDetails(response.data);
        }catch(err){    
            setError(err);
        }finally{
            setIsLoading(false);
        }
      }
    
      useEffect(()=>{
        getTripDetails();
        console.log(tripDetails);
    },[tripData]);

    const formattedDate = new Date(tripDetails?.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      


    return(
        <>
            <Navbar back={back} />
            

            {isLoading ? (
                    <TripDetailsSkeleton />
                    ) : (
                        <div className="fixed flex items-center justify-between w-full h-[65px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200 px-3 z-10">
                            <div className="w-[261px] flex items-center justify-start">
                                <div className="ml-1 w-[50px] h-[50px] bg-gray-300 rounded-full flex justify-center items-center">
                                    <p className="text-[22px] font-nunito font-normal leading-[38px] text-[#374151]">
                                            {tripDetails?.tripname?.charAt(0).toUpperCase()}
                                            {tripDetails?.tripname?.charAt(tripDetails?.tripname?.length - 1).toUpperCase()}
                                    </p>
                                </div>
                            <div className="w-[200px] flex flex-col justify-center items-start">
                
                    <p className="relative ml-2 top-[4px] text-[24px] font-nunito font-semibold italic leading-[48px] text-[#374151]">
                         <div className={`scroll-marquee-wrapper ${isLongTripname ? "" : "overflow-visible"}`}>
                            <span className={isLongTripname ? "scroll-marquee" : ""}>
                                {tripDetails?.tripname}
                            </span>
                         </div>
                    </p>
        
                    <p className="relative ml-2 bottom-[7px] text-[14px] font-nunito font-normal italic leading-[27px] text-[#374151]">
                        {formattedDate}
                    </p>
                    </div>
                </div>
                
                <div className="flex flex-col w-[60px] h-[65px] items-center justify-center">
                    <FcAbout className="w-full h-[26px]"/>
                    <p className="text-[13px]">About us</p>
                </div>

            </div>
            )}

            {showUserModal && (
              <AddMembers handleUsers={handleUsers} tripData={tripData}  />
            )}


                    <div className="absolute flex flex-col w-full top-36 h-screen">
                      {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <IndiMemberSkeleton key={i} />)
                      ) : tripDetails?.members.length > 0 ? (
                        tripDetails.members.map((member, index) => (
                          <IndiMember
                            key={member._id}
                            index={index + 1}
                            member={member}
                            username={member.username}
                            fullname={member.fullname}
                            totalSpend={member.totalSpend}
                            email={member.email}
                          />
                        ))
                      ) : (
                        <p className="text-center text-gray-600 mt-6">No members yet...</p>
                      )}
                    </div>


          <div className="fixed flex justify-center items-center bottom-0 w-full h-[62px] left-0 bg-gray-300 shadow-md">
      <div className="mx-2 flex flex-col justify-center items-center h-[140px] w-[80px] mb-3 gap-">
            <div className="flex justify-center items-center h-[80px] w-[80px] rounded-full bg-[rgb(243,255,246)]">
              {/* <IoIosAddCircle className="relative w-[78px] h-[78px] text-[rgb(20,184,166)]" 
                    // onClick={handleForm}
              />  */}
              <IoPersonAddSharp className="relative w-[42px] h-[42px] text-gray-500" 
                onClick={handleUsers}
                tripData = {tripData}
                getTripDetails = {getTripDetails}
              />
            </div>

            <p className="text-[14px] mb-9 mt-1">Add User</p>
        </div>   
      </div>

        </>
    );
}

export default Members;