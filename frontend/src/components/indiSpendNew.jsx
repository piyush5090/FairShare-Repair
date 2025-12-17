const IndiSpend = ({index,member}) =>{

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
  const fullname = member._id.fullname;
  const username = member._id.username;
  const totalSpend = member.totalSpend;
  const nameParts = fullname.trim().split(" ");
  const isLongFullname = fullname?.length > 13;
  const isLongUsername = username?.length > 15;

  return(
    <>
      <div className="flex w-full h-[71px] px-2 mt-3 justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
            <div className="px-1 justify-center items-center flex">
              <div className="flex items-center justify-center w-[55px] h-[55px] rounded-[14px]"
                style={{ backgroundColor: avatarBgColor }}
              >
                <p className="text-[20px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                  {nameParts[0]?.charAt(0).toUpperCase()}{nameParts[1]?.charAt(0).toUpperCase()}
                </p>
              </div>
  
              <div className="w-auto flex flex-col items-start"> 
                  <p className="mx-2 text-[19px] font-[Montserrat] font-medium italic leading-[25px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                    {isLongFullname ? `${fullname?.slice(0,12)}...` : fullname}
                      {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                          <span className={isLongFullname ? "scroll-marquee" : ""}>
                               {fullname}
                          </span>
                      </div> */}
                  </p>

                  <p className="mx-2 text-[15px] font-[Montserrat] font-medium italic leading-[25px] tracking-[0px] text-left text-gray-600">
                    {isLongUsername ? `@${username?.slice(0,15)}...` : `@${username}`}
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
                    {totalSpend}/-
                </span>
  
              </div>
  
          </div>

    </>
  );
}

export default IndiSpend;