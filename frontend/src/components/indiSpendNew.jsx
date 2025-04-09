const IndiSpend = ( {member, username, fullname, index, totalSpend} ) =>{

    const isLongFullname = fullname.length > 13;
      return(
        <>
        {/* <div className="absolute top-[50px]"> */}
  
          <div class="flex w-screen h-[73px] justify-between rounded-[15px] mb-4 shadow-md bg-[rgba(242,236,236,0.17)]">
            <div className="pl-4 justify-center items-center flex">
              <div class="flex items-center justify-center w-[61px] h-[59px] rounded-full bg-[rgb(216,255,234)]">
                <p className="text-[22px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                  {fullname.charAt(0).toUpperCase()}{fullname.charAt(fullname.length-1).toUpperCase()}
                </p>
              </div>
  
              <div className="w-auto flex items-center"> 
                  <p className="ml-2 text-[24px] font-[Montserrat] font-semibold italic leading-[29px] tracking-[0px] text-left text-[rgb(69,26,3)]">
                    {isLongFullname ? `${fullname.slice(0,9)}...` : fullname}
                      {/* <div className={`scroll-marquee-wrapper ${isLongFullname ? '' : 'overflow-visible'}`}>
                          <span className={isLongFullname ? "scroll-marquee" : ""}>
                               {fullname}
                          </span>
                      </div> */}
                  </p>
              </div>
            </div>
  
            <div className="flex items-center pr-4">
                <span class="text-[#57f268] font-montserrat text-[28px] font-extrabold leading-[34px] tracking-[0px] text-left">
                    {totalSpend}/-
                </span>
  
              </div>
  
          </div>
          {/* </div> */}
  
        </>
      );
  }
  
  export default IndiSpend;