import { SiPhonepe } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";




const IndiSuggetion = ()=>{

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

  let index = 0;
  const avatarBgColor = avatarColors[index % avatarColors.length];
  // const nameParts = payment?.fullname.trim().split(" ");
  // const isLongFullname = payment?.fullname?.length > 13;
  // const isLongUsername = payment?.username.kength > 15;

  return(
    <>
    <div className="flex justify-center items-center px-3 flex-col w-full h-[240px] ">
    <div className="flex flex-col p-3 w-full h-[190px] rounded-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[rgba(242,236,236,0.17)]">
      {/* first section */}
      <div className="flex w-full h-[65px] justify-between rounded-[15px] bg-[rgba(242,236,236,0.17)]">
        <div className="px-1 justify-center items-center flex">
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[14px]"
                  style={{ backgroundColor: avatarBgColor }}
          >
            <p className="text-[18px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                    PG
                    {/* {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()} */}
            </p>
          </div>
    
                
          <div className="w-auto flex flex-col items-start"> 
            <p className="mx-2 text-[18px] font-[Montserrat] font-semibold italic leading-[27px] tracking-[0px] text-left text-blue-500 ">
                      {/* {isLongFullname ? `${payment?.fullname?.slice(0,12)}...` : payment?.fullname} */}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                        Piyush Govin... <span className="relative top-3 ml-3 text-gray-800 text-[20px] font-semibold">can pay</span>
            </p>
  
                    
            <p className="mx-2 text-[13px] font-[Montserrat] font-medium italic leading-[21px] tracking-[0px] text-left text-gray-600">
                      {/* {isLongUsername ? `@${payment?.username?.slice(0,12)}...` : `@${payment?.username}`} */}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                        @piyush_5090
            </p>
          </div>
        </div>
      </div>


        {/* second section */}
        
        <div className="flex w-full h-[60px] justify-between rounded-[15px] bg-[rgba(242,236,236,0.17)]">
          <div className="flex items-center h-[65px] ml-2 w-[140px]">
            <span class="text-green-600 flex font-montserrat text-[22px] font-semibold leading-[34px] tracking-[0px] text-left">
                      1290/-{/* {payment?.spend}/- */}
            </span>
          </div>

          <div className="flex w-[50px] h-[65px] justify-end items-center font-montserrat text-gray-800 text-[22px] font-semibold leading-[40px] tracking-[0px] text-right">
            <p className=" relative text-gray-800 font-semibold ">to </p>
          </div>

          <div className="flex w-full h-[65px] justify-end rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
            <div className="px-1 justify-center items-center flex">
              <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[14px]"
                  style={{ backgroundColor: avatarBgColor }}
              >
              
              <p className="text-[18px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                    PG
                    {/* {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()} */}
              </p>
            </div>
    
            <div className="w-auto flex flex-col items-start"> 
              <p className="mx-2 text-[18px] font-[Montserrat] font-semibold italic leading-[27px] tracking-[0px] text-left text-blue-500 ">
                      {/* {isLongFullname ? `${payment?.fullname?.slice(0,12)}...` : payment?.fullname} */}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                        Piyush Govin... 
              </p>
  
              <p className="mx-2 text-[13px] font-[Montserrat] font-medium italic leading-[21px] tracking-[0px] text-left text-gray-600">
                      {/* {isLongUsername ? `@${payment?.username?.slice(0,12)}...` : `@${payment?.username}`} */}
                        {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                            <span className={isLongFullname ? "scroll-marquee" : ""}>
                                 {fullname}
                            </span>
                        </div> */}
                        @piyush_5090
              </p>
            </div>
          </div>
          </div>

        </div>


        <div class="w-full flex gap-2 items-center justify-center mt-3 h-[45px] rounded-[20px] bg-indigo-200">
          <p class="text-[rgb(55,65,81)] flex font-[Montserrat] text-[16px] font-medium leading-[24px] tracking-[0px] text-left">
              Pay via UPI
          </p>
          <SiPhonepe />
          <SiPaytm className="h-[30px] w-[30px]"/>
          <FaGooglePay className="h-[35px] w-[35px]"/>
        </div>


    </div>
    </div>
    </>
  );
}

export default IndiSuggetion;