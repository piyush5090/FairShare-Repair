import { useEffect } from "react";

const IndiPay = ({ index, payment }) =>{

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
  const nameParts = payment?.fullname.trim().split(" ");
  const isLongFullname = payment?.fullname?.length > 13;
  const isLongUsername = payment?.username.kength > 15;

  useEffect(()=>{
    console.log(payment);
  },[]);

  const formattedDate = new Date(payment?.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  hour12: true,
  });

  return(
    <>
    {/* <div className="flex justify-center items-center h-screen px-2 "> */}
        <div className="w-full mt-3 pb-3 px-3 h-[147px] rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] bg-[rgba(242,236,236,0.17)] ">
            <div className="flex w-full h-[71px] justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
            <div className="px-1 justify-center items-center flex">
              <div className="flex items-center justify-center w-[55px] h-[55px] rounded-[14px]"
                style={{ backgroundColor: avatarBgColor }}
              >
                <p className="text-[20px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                  {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()}
                </p>
              </div>
  
              <div className="w-auto flex flex-col items-start"> 
                  <p className="mx-2 text-[22px] font-[Montserrat] font-medium italic leading-[29px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                    {isLongFullname ? `${payment?.fullname?.slice(0,12)}...` : payment?.fullname}
                      {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                          <span className={isLongFullname ? "scroll-marquee" : ""}>
                               {fullname}
                          </span>
                      </div> */}
                  </p>

                  <p className="mx-2 text-[15px] font-[Montserrat] font-medium italic leading-[23px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                    {isLongUsername ? `@${payment?.username?.slice(0,12)}...` : `@${payment?.username}`}
                      {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                          <span className={isLongFullname ? "scroll-marquee" : ""}>
                               {fullname}
                          </span>
                      </div> */}
                  </p>
              </div>
            </div>
  
            <div className="flex items-center pr-1">
                <span class="text-green-600 font-montserrat text-[22px] font-semibold leading-[34px] tracking-[0px] text-left">
                    {payment?.spend}/-
                </span>
  
              </div>
  
          </div>

        <div className="h-[64px] px-2 flex flex-col items-start justify-center w-auto rounded-md shadow-md bg-slate-200">
            <p class="text-[rgb(69,26,3)] font-[Montserrat] text-[22px] font-medium leading-[29px] tracking-[0px] text-left">
                    At: {payment?.where} 
            </p>


            <p class="text-[rgb(128,128,128)] font-[Nunito] text-[18px] font-medium leading-[25px] tracking-[0px] text-left">
                    {formattedDate}
            </p>

        </div>
      </div>
  
    {/* </div> */}
      

    </>
  );
}

export default IndiPay;