import Navbar from "./navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import BottomNavbar from "./bottomNavbar";
import IndiSpend from "./indiSpendNew";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { TbCancel } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import AddSpend from "./addSpendNew";
import EndTrip from "./endTripNew";
import { IoIosAddCircle } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import DeleteTrip from "./deleteTrip";
import DeleteTripAdmin from "./deleteTripAdmin";
import { useTrips } from "../contexts/TripsContext";
import { currUser } from "../contexts/UserContext";






const IndiTripDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [currTrip, setCurrTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [showAddSpend, setShowAddSpend] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  // const[user,setUser]=useState(null);
  const[showDelete,setShowDelete]=useState(false);
  const[adminDelete,setAdminDelete]=useState(false);
  const{trips, getAllTrips, isAllTripsLoading} = useTrips();
  const {userInfo, isUserLoading, getUser} = currUser();
  

  const {tripData} = location.state || {};

  const handleShowAddSpend = () => {
    setShowAddSpend(!showAddSpend);
  };

  const handleEnd = () => {
    setShowEnd(!showEnd);
  };

  const getTrip = async () => {
    setIsLoading(true);
    try {
      const _id = tripData.TripId;
      const response = await axiosInstance.get(`/getTrip/${_id}`);
      console.log(response);
      setCurrTrip(response.data);
      setMembers(response.data.members);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // const getUser = async () =>{
  //   try{
  //     const userRes = await axiosInstance.get("/getUser");
  //     console.log("User data",userRes.data.user);
  //     setUser(userRes.data.user);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(`/deleteTrip/${user._id}`, { currTrip });
      navigate("/tripsDashboard");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete trip!");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteAdmin = async () => {
    setIsLoading(true);
    try {
      const res1 = await axiosInstance.post(`/deleteTrip/${user._id}`, { currTrip });
      const res = await axiosInstance.delete(`/deleteAdmin/${tripData.TripId}`);
      console.log(res.data.message);  
      navigate("/tripsDashboard");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to delete Admin trip!");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getTrip();
    // getUser();
    console.log(tripData);
  }, []);

  useEffect(() => {
    console.log("Location State:", location.state);
  }, []);
  

  const formattedDate = new Date(currTrip?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const back = () => {
    navigate(-1);
  };

  const isLongTripname = currTrip?.tripname.length > 10;

  const handleHistory = () =>{
    console.log(currTrip);
    navigate("/payHistory", { state: { tripData : tripData }});
  }

  const handleMembers = () =>{
    navigate("/members", { state : { tripData : tripData }});
  }

  const handleSettle = () =>{
    navigate("/suggestions", { state: { tripId: currTrip?._id } });
  }


  const handleDeleteClick = tripData.Admin === userInfo?._id
  ? () => setAdminDelete(true)
  : () => setShowDelete(true);

  return (
    <>
      <Navbar back={back} />

      {isLoading ? (
        <>
          {/* Skeleton Header */}
          <div className="fixed flex items-center justify-between w-screen max-w-[370px] h-[73px] left-[11px] right-[-19px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200 animate-pulse px-3 z-10">
            <div className="w-[261px] flex items-center justify-start gap-3">
              <div className="w-[61px] h-[56.94px] bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="w-[35px] h-[35px] bg-gray-300 rounded-full"></div>
          </div>

          {/* Skeleton IndiSpend Cards */}
          <div className="absolute flex flex-col gap-4 w-full top-40 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center w-full max-w-2xl mx-auto px-4 h-[80px] rounded-[14px] shadow-md bg-[rgba(196,196,196,0.1)] animate-pulse"
              >
                <div className="flex justify-center items-center w-[55px] h-[55px] bg-gray-300 rounded-full"></div>
                <div className="flex flex-col justify-start items-start flex-1 ml-4 gap-2">
                  <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
                </div>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-md"></div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
              {/* Trip detals section */}
        <div className="flex felx-col mt-[65px]">
          <div className="fixed w-screen h-[90px] items-center justify-center z-10 bg-[#f3fff6] px-2">
          <div className="flex items-center justify-between w-full h-[90px] rounded-[28px]"> 
          <div className="flex items-center justify-between w-screen h-[65px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200 px-3 z-10">
            <div className="w-[261px] flex items-center justify-start">
              <div className="ml-1 w-[50px] h-[50px] bg-gray-300 rounded-full flex justify-center items-center">
                <p className="text-[22px] font-nunito font-normal leading-[38px] text-[#374151]">
                  {currTrip?.tripname?.charAt(0).toUpperCase()}
                  {currTrip?.tripname?.charAt(currTrip?.tripname?.length - 1).toUpperCase()}
               </p>
              </div>
            <div className="w-[200px] flex flex-col justify-center items-start">
          
          <p className="relative ml-2 top-[4px] text-[24px] font-nunito font-semibold italic leading-[48px] text-[#374151]">
              <div className={`scroll-marquee-wrapper ${isLongTripname ? "" : "overflow-visible"}`}>
                <span className={isLongTripname ? "scroll-marquee" : ""}>
                  {currTrip?.tripname}
                </span>
              </div>
          </p>
        
          <p className="relative ml-2 bottom-[7px] text-[14px] font-nunito font-normal italic leading-[27px] text-[#374151]">
           {formattedDate}
          </p>
          </div>
          </div>

          <div className="flex h-[65px] w-full items-end justify-center gap-1 ">
            <div className="h-[65px] flex flex-col w-full items-center justify-center">
                <MdDeleteOutline className="h-[32px] w-[32px] text-red-700"
                  onClick={handleDeleteClick}
                />
                <p className="text-[12px] font-bold">Delete</p>
              </div>
              

              <div className="h-[65px] flex flex-col w-full items-center justify-center pr-3">
                <button onClick={handleSettle}> 
                <MdOutlineTipsAndUpdates className="h-[32px] w-[32px] text-yellow-700 ml-[2px]"/>
                <p className="text-[12px] font-bold">Settle!</p>
                </button> 
                
              </div>
          </div>
          </div>
          </div>
          </div>

          {/* Indi payer section */}

          <div className="flex flex-col w-full mt-[70px] overflow-scroll">
          {members.length > 0 ? (
              members.map((member, index) => (
                <IndiSpend
                  key={member._id}
                  index={index+1}
                  member={member}
                  username={member.username}
                  fullname={member.fullname}
                  totalSpend={member.totalSpend}
                />
              ))
            ) : (
              <p className="text-center text-gray-600 mt-6">No Spends Yet...</p>
            )}

        </div>

        
      </div>          

          <div className="absolute flex flex-col w-full top-36 h-screen">
            
          </div>
        </>
      )}

      {showAddSpend && (
        <AddSpend
          handleShowAddSpend={handleShowAddSpend}
          tripId={currTrip?._id}
          refreshTripData={getTrip}
        />
      )}

      {showEnd && <EndTrip handleEnd={handleEnd} currTrip={currTrip} />}
      {showDelete && <DeleteTrip handleDelete={handleDelete} setShowDelete={setShowDelete} userId={userInfo._id}
        isLoading={isLoading}
      />}
      {adminDelete && <DeleteTripAdmin handleDeleteAdmin={handleDeleteAdmin} setShowDelete={setAdminDelete} userId={userInfo._id}
        isLoading={isLoading}
      />}


      <div className="fixed flex justify-between items-center bottom-0 w-full h-[66px] left-0 bg-gray-300 shadow-md">

      <div className="ml-2 w-full h-[66px] flex flex-col text-center items-center justify-center">
        <FcAbout className="h-[32px] w-[32px] text-gray-600  hover:text-purple-500"/>
          <p className="text-[14px]">About Us</p>
        </div>

        <div className=" w-full h-[66px] flex flex-col items-center justify-center" >
          <RxCrossCircled className="h-[32px] w-[32px] text-gray-600 " onClick={handleEnd} />
          <p className="text-[14px]">End</p>
        </div>

        <div className="mx-2 flex flex-col justify-center items-center h-[140px] w-full mb-3 gap-">
            <div className="flex justify-center items-center h-[80px] w-[80px] rounded-full bg-[rgb(243,255,246)]">
              <IoIosAddCircle className="relative w-[78px] h-[78px] text-[rgb(20,184,166)]" 
                    onClick={handleShowAddSpend}
              /> 
            </div> 
            <p className="text-[14px] mb-7 mt-1">Add Spend</p>
        </div>
         
        <div className="h-[66px]  w-full flex flex-col items-center justify-center">
          <GoHistory className="h-[32px] w-[32px] text-gray-600  hover:text-purple-500" 
          onClick={handleHistory}
            // onClick={() => navigate("/test", { state: { tripId: currTrip?._id } })}
          />
          <p className="text-[14px]">History</p>
        </div>

        <div className="mr-2 h-[66px] w-full flex flex-col items-center justify-center">
              <GrGroup className="h-[30px] w-[30px] text-gray-600  hover:text-purple-500" 
                onClick={handleMembers}
              />
              <p className="text-[14px]">Members</p>
            </div>

        
      </div>
    </>
  );
};

export default IndiTripDashboard;
