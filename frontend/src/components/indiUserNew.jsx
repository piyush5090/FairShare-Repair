import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { currUser } from "../contexts/UserContext";

const IndiUser = ({index,member, key,user, fullname, tripData, totalSpend, username, email  }) =>{

    const avatarColors = [
      "#A7D2CB", // mint green
      "#F2B5D4", // soft pink
      "#F7D9C4", // peach beige
      "#C3FBD8", // light mint
      "#B5C0D0", // dusty lavender
      "#FFF4B1", // soft yellow
      "#D7E3FC", // powder blue
      "#FFDDD2", // coral tint
      "#E0BBE4", // pastel purple
      "#BEE1E6"  // light aqua
    ];
  
    const avatarBgColor = avatarColors[index % avatarColors.length];
    const nameParts = fullname?.trim().split(" ");
    const isLongFullname = fullname?.length > 20;
    const[isLoading,setIsLoading]=useState(false);
    const[invited,setInvited] = useState(false);
    // const[currUser,setCurrUser]=useState(null);
    const {userInfo, isUserLoading, getUser} = currUser();

    

    // const getUser = async () =>{
    //   setIsLoading(true);
    //   try{
    //     const res = await axiosInstance.get("/getUser");
    //     setCurrUser(res.data.user);
    //   }catch(err){
    //     console.log(err);
    //   }finally{
    //     setIsLoading(false);
    //   }  
    // }

    const notification = {
      fromId : userInfo?._id,
      fromUsername : userInfo?.username,
      fromFullname : userInfo?.fullname,
      message : `invited you to join the group
        trip ${tripData?.Tripname}.`,
      tripId : tripData.TripId,
      tripName: tripData.Tripname,
      time: Date.now(),
    }

    const handleInvite = async ()=>{
      setIsLoading(true);
      try{
        setInvited(true);
        const res = await axiosInstance.post(`/invitations/${user._id}`,{ notification });
        console.log(res);
      }catch(err){ 
          console.log(err);
      }finally{
        setIsLoading(false);
      }
    }

    // useEffect(()=>{
    //   getUser();
    // },[])
  
    return(
      <>
        <div className="flex w-full h-[71px] mt-1 justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
              <div className="px-1 justify-center items-center flex">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[14px]"
                  style={{ backgroundColor: avatarBgColor }}
                >
                  <p className="text-[19px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                    {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()}
                  </p>
                </div>
    
                <div className="w-auto flex flex-col justify-start"> 
                    <p className="mx-2 text-[18px] font-[Montserrat] font-medium italic leading-[29px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                      {isLongFullname ? `${fullname?.slice(0,12)}...` : fullname}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                    </p>

                    <p className="mx-2 italic text-[14px] font-[Montserrat] font-medium leading-[16px]  tracking-[0px] text-left text-gray-700">
                        @{username}
                    </p>
                </div>
              </div>
    
              <div className="flex h-full mx-3 w-[90px] justify-center items-center pr-1">
                  <button className={`h-[40px] w-full text-[14px] font-[Montserrat] font-medium ${invited ? "bg-green-300" : "bg-slate-200"} rounded-[20px]`}
                    onClick={handleInvite}
                  >
                  {invited ? "Invited" : "Invite"}
                  
                  </button>
                </div>
    
            </div>
  
      </>
    );
  }
  
  export default IndiUser;