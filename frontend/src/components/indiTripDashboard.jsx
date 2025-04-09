import Navbar from "./navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import BottomNavbar from "./bottomNavbar";
import IndiSpend from "./indiSpendNew";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { TbCancel } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import AddSpend from "./addSpendNew";
import EndTrip from "./endTripNew";




const IndiTripDashboard = () =>{

  const navigate = useNavigate();
  const location = useLocation();
  const[isLoading,setIsLoading] = useState(false);
  const[currTrip,setCurrTrip]=useState(null);
  const[members,setMembers]=useState([]);
  const[showAddSpend,setShowAddSpend] = useState(false);
  const[showEnd,setShowEnd] = useState(false);

  const { tripData } = location.state || {};

  const handleShowAddSpend = () =>{
    setShowAddSpend(!showAddSpend);
  }

  const handleEnd = () =>{
    setShowEnd(!showEnd);
  }

  const getTrip = async () => {
    setIsLoading(true);
    try{
      const _id = tripData.TripId;
      const response = await axiosInstance.get(`/getTrip/${_id}`);
      setCurrTrip(response.data);
      setMembers(response.data.members);
    }catch(err){{
      console.log(err);
    }}finally{
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    getTrip();
  },[]);

  useEffect(()=>{
    console.log(currTrip);
  },[currTrip]);

  const formattedDate = new Date(currTrip?.createdAt).toLocaleDateString("en-GB",{
    day : "2-digit",
    month : "short",
    year : "numeric"
});

  const back = () =>{
    navigate("/tripsDashboard");
  }

  const isLongTripname = currTrip?.tripname.length > 10;

  return(
    <>
      <Navbar back = {back}/>

      <div class="fixed flex items-center justify-between w-screen max-w-[370px] h-[73px] left-[11px] right-[-19px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200">

        <div className="w-[261px] flex items-center justify-start">
        <div class="ml-3 w-[61px] h-[56.94px] bg-gray-300 rounded-full flex justify-center items-center"> 
            <p className="text-[28px] font-nunito font-normal leading-[38px] tracking-[0px] text-left text-[#374151]" >
              {currTrip && currTrip?.tripname?.charAt(0).toUpperCase()}{currTrip?.tripname?.charAt(currTrip.tripname.length-1).toUpperCase()}
            </p>
            
        </div>

        <div className="w-[200px] flex flex-col justify-left "> 
                <p className="relative ml-2 top-[4px] text-[28px] font-nunito font-semibold italic leading-[48px] tracking-[0px] text-left text-[#374151]">
                    <div className={`scroll-marquee-wrapper ${isLongTripname ? '' : 'overflow-visible'}`}>
                        <span className={isLongTripname ? "scroll-marquee" : ""}>
                             {currTrip?.tripname}
                        </span>
                    </div>
                   
                </p>
                
                <p className="relative ml-2 bottom-[7px] text-[16px] font-nunito font-normal italic leading-[27px] tracking-[0px] text-left text-[#374151]">
                    {formattedDate}
                </p>
            </div>
        </div>
        

            <div className="flex w-[86px] justify-center">
                <GrGroup className="w-[35px] h-[35px]"/>
            </div>

      </div>

      {isLoading ? (
          <div className="Flex justify-center items-center min-h-screen">
                <div className="loader"></div>
                  <p>Loading you trips...</p>
          </div>
          ) : (
          <div className="absolute flex flex-col w-full top-40 h-screen"> 
              {members.length > 0 ? (
                members.map((member) => (
                  <IndiSpend 
                      key={member._id}
                      member={member}
                      username={member.username}
                      fullname={member.fullname}
                      totalSpend={member.totalSpend}
                  />
              ))
            ) : (
              <p>No Spends Yet...</p>
            )}

          </div>
          )}

          {showAddSpend && (
            <AddSpend handleShowAddSpend={handleShowAddSpend}
                      tripId={currTrip?._id}
                      refreshTripData={getTrip}
            />
          )}

          {showEnd && <EndTrip handleEnd={handleEnd}/>}


        <div className="fixed flex justify-between bottom-0 w-full h-[70px] left-0 bg-gray-300">

            <div className="px-6 h-[70px] bg-gray-300 flex items-center justify-center shadow-xl"

            >
                <TbCancel className="h-[50px] w-[50px] text-red-600 hover:text-red-500"
                  onClick={handleEnd}
                />
            </div>

            <div className="px-6 h-[70px] bg-gray-300 flex items-center justify-center"

            >
               <IoMdAddCircleOutline className="h-[60px] w-[60px] text-green-600 hover:text-green-500"
                onClick={handleShowAddSpend}
               />
            </div>

            <div className="px-6 h-[70px] bg-gray-300 flex items-center justify-center"

            >
              <FaHistory className="h-[43px] w-[43px] text-purple-600 hover:text-purple-500"/>
            </div>
        </div>

      
    </>
  );
}

export default IndiTripDashboard;