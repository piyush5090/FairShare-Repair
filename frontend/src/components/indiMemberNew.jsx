import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";

const IndiMember = ({index,member,  fullname, totalSpend, username,memberId, email, tripData, user, getTripDetails  }) =>{

  
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

    const [isLoading,setIsLoading]=useState(false);

    useEffect(()=>{
      console.log(tripData);
    },[]);

    const handleRemove = async () =>{
        setIsLoading(true);
        try{
          const res = await axiosInstance.post(`/remove/${tripData.TripId}`,{ memberId });
          console.log(res);
          getTripDetails();
        }catch(err){
          console.log(err);
        }finally{
          setIsLoading(false);
        }
    }

    
    const avatarBgColor = avatarColors[index % avatarColors.length];
    const nameParts = fullname.trim().split(" ");
    const isLongFullname = fullname?.length > 20;
  
    return(
      <>
        <div className="flex w-full h-[71px] px-2 justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
              <div className="px-1 justify-center items-center flex">
                <div className="flex items-center justify-center w-[55px] h-[55px] rounded-[14px]"
                  style={{ backgroundColor: avatarBgColor }}
                >
                  <p className="text-[20px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                    {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()}
                  </p>
                </div>
    
                <div className="w-auto flex flex-col justify-start"> 
                    <p className="mx-2 text-[20px] font-[Montserrat] font-medium italic leading-[29px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                      {isLongFullname ? `${fullname?.slice(0,12)}...` : fullname}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                    </p>

                    <p className="mx-2 text-[15px] font-[Montserrat] font-medium leading-[16px] max-w-[160px] tracking-[0px] text-left text-gray-700 overflow-hidden" >
                    <span className={email.length > 17 ? "scroll-marquee" : ""}>
                        {email}
                    </span>
                    </p>
                </div>
              </div>
    
                
                {email === user.email ? (
                      <div className="flex items-center pr-1">
                      <p class="h-[30px] w-[65px] mr-1 font-montserrat text-[15px] font-semibold text-gray-700 flex items-center justify-center">
                          (self)
                      </p>
                    </div>
                ) : 
                  tripData.Admin === user._id && (
                    <div className="flex items-center pr-1">
                    <button class="h-[30px] w-[65px] mr-1 bg-red-100 font-montserrat rounded-[55px] text-[10px] font-semibold text-gray-700 flex items-center justify-center"
                      onClick={handleRemove}
                    >
                        remove
                    </button>
      
                  </div>
                )}
                
              

              
    
            </div>
  
      </>
    );
  }
  
  export default IndiMember;