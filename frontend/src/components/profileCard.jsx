import Navbar from "./navbar";
import { PiUserLight } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";


const ProfileCard = ({ handleProfile, onLogout, userInfo, getUserInfo }) => {

    const cardRef = useRef(null);
    const [change,setChange]=useState("");
    const[isLoading,setIsLoading]=useState(false);

    function handleChange(event){
        event.preventDefault();
        const{ id,value }=event.target;
        setChange(prevState => ({
            ...prevState,
            [id]:value
        }));
    };

    


    const handleEnter = async ()=>{
        setIsLoading(true);
        try{
            const res = await axiosInstance.post(`/setUpi/${userInfo._id}`,{ change });
            getUserInfo();
            console.log(res);
        }catch(err){
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(cardRef.current && !cardRef.current.contains(event.target)){
                handleProfile();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>{
            document.removeEventListener("mousedown",handleClickOutside);
        };
    },[handleProfile]);

    const isLongFullname = userInfo.fullname.length > 12;

  return (
    <>
      <div className="fixed w-screen px-2 h-[210px] mt-[73px] items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-40 inset-0 bg-black/30 backdrop-blur-sm">
        <div className="w-full h-[200px] rounded-[11px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-gray-300" 
            ref={cardRef}
        >
          {/* Top section */}
          <div className="flex gap-2">
            {/* Avatar */}
            <div className="flex flex-col ml-2 gap-2 items-center">
              <div className="flex items-center justify-center w-[104px] mt-[15px] h-[104px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[rgba(243,244,246,0.81)] rounded-full">
                <PiUserLight className="w-[60px] h-[60px] text-gray-600" />
              </div>
            </div>

            {/* Profile details */}
            <div className="flex flex-col mt-[35px]">
              <p className="w-[25px] mb-1 h-[10px] text-[13px] leading-[10px] font-normal text-[#374151] font-inter text-left">
                Profile
              </p>
              <p className="w-full overflow-hidden h-[35px] text-[29px] leading-[35px] font-normal text-[#374151] font-['Lexend_Deca'] text-left">
              <span className={isLongFullname ? "scroll-marquee" : ""}>
                    {userInfo.fullname.toLowerCase()}
              </span>
                
              </p>
              <p className="w-[162px] h-[15px] mt-2 text-[15px] leading-[15px] font-normal text-[#374151] font-inter text-left">
                {userInfo.email}
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex items-center justify-between px-2 mt-2 ">
            {/* UPI section */}
            <div className="flex flex-col gap-2">
              <p className="text-[15px] leading-[13px] text-left ml-2 font-normal text-[#374151] font-['Lexend_Deca']">
                @{userInfo.username}
              </p>

              <div className="flex gap-[5px] ml-2 mt-1 mb-2 items-center justify-center">
                <p className="text-[17px] leading-[15px] font-normal text-[#374151] font-['Lexend_Deca'] text-left">
                  UPI id:
                </p>

                {userInfo.upiId ? (
                <>
                        <p className="text-gray-700 text-[17px]">{userInfo.upiId}</p>
                        <p className="text-[#257fe3] text-[15px] underline cursor-pointer" onClick={handleEnter}>
                            reset
                        </p>
                </>
            ) : (
                <>
                <input
                    className="w-[135px] px-2 py-1 rounded-lg bg-[#b7c4d2] border border-black text-[#374151]"
                    type="text"
                    placeholder={userInfo.upiId ? "reset" : "Enter upi id"}
                    id="upi"
                    onChange={handleChange}
                />
                
                <p className="text-[#257fe3] text-[15px] underline cursor-pointer" onClick={handleEnter}>
                    enter
                </p>
            </>
            )}

                
              </div>
            </div>

            {/* Logout button */}
            <div className="flex flex-col mr-2 h-[70px] w-[60px] items-center justify-center">
              <MdLogout className="w-[35px] h-[35px]" onClick={onLogout}/>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
