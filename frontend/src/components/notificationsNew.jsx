import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import NotificationCard from "./notificationCard";


const Notifications = ({ userInfo,  handleBell, getUserInfo })=>{

    const[isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
        getUserInfo();
    },[]);

  return(
    <>
      <div className="w-screen px-2 h-screen flex rounded-[33px] bg-[#f3fff6]">
        <div className="fixed inset-0 flex p-3 flex-col items-center top-[50px] w-full h-[694px] border border-[#75b3f8] rounded-[33px] bg-[#f3fff6] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-[50px] z-40">
          {/* Heading */}
          <div className="w-[328px] h-[47px] left-[8.7px] right-[9.05px] top-0 bottom-[-5px] text-[#7a7171] font-nunito text-[30px] font-extrabold leading-[41px] tracking-[0px] text-center">
            Notifications
          </div>

          {/* Users section */}
          <div className="w-full h-full mt-3 mb overflow-scroll">
            {userInfo.notifications?.length > 0 ? (
             userInfo.notifications.map((info, index)=>(
                <NotificationCard userInfo={userInfo} info={info} getUserInfo={getUserInfo} handleBell={handleBell}/>
             ))   
                
                    ) : (
                    <p>No new notifications..</p>
                    )}
            </div>

            <div className="w-full h-[70px] bg-[#f3fff6] rounded-[33px] flex items-end justify-around">
                    <button className="h-[40px] font-montserrat w-[100px] font-normal bg-slate-300 rounded-[33px]"
                        onClick={handleBell}
                    >
                        Close
                    </button>
            </div>      

        </div>
      </div>

    </>
  );
}

export default Notifications;