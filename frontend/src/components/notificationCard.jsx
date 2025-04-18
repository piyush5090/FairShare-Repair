import React from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useState, useEffect } from 'react';

const NotificationCard = ({ userInfo, info, getUserInfo, handleBell }) => {

  const[isLoading,setIsLoading]=useState(false);
  const[trip,setTrip]=useState(null);

  const formattedDate = new Date(info.time).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const getTrip = async ()=>{
    setIsLoading(true);
    try{
      const res = await axiosInstance.get(`/getTrip/${info.tripId}`);
      setTrip(res.data);
      console.log(res);
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  };

  const tripData = {
    TripId: info.tripId,
    Tripname: trip?.tripname,
    CreatedAt: trip?.CreatedAt
  }

  const onAdd = async () => {
    getTrip();
    if(trip){
      try {
        // Ensure both currUser and tripData are being sent correctly in the body
        const response = await axiosInstance.put(`/add/${userInfo._id}`, {
            currUser: userInfo,   
            tripData: tripData,
            info : info,     
        });
        getUserInfo();
        handleBell();
        console.log(response.data);  
    } catch (err) {
        console.log(err);  
    }
    } 
};


  return (
    <div className="bg-[#f2f3f7] border-[1.5px] border-[#f2f3f7] rounded-xl shadow-[1em_1em_1em_#d8dae0b1,-0.75em_-0.75em_1em_#ffffff] hover:bg-[#d3ddf1] hover:border-[#1677ff] transition duration-200 cursor-pointer w-fit">
      <div className="flex flex-row gap-3 mt-5 mb-5 ml-5 mr-8">
        <div className="mt-1.5">
          <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1 text-[#333]">
            <p className="text-content">
              <a href="#" className="text-black font-medium no-underline">{info.fromUsername}</a> {info.message}{' '}
            </p>
            <p className="text-sm text-[#777]">{formattedDate}</p>
          </div>
          <div className="flex flex-row items-center gap-4">
            
            <button className="text-[#666] font-normal text-[15px] bg-transparent hover:underline">
            Reject 
            </button>
            <button className="text-green-400 font-semibold text-[15px] bg-transparent rounded-full hover:underline"
              onClick={onAdd}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
