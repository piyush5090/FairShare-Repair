import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const IndiTrip = ({tripname, tripId, createdAt, index}) =>{

    const navigate = useNavigate();

    const [tripData, setTripData] = useState({
        TripId : tripId,
        Tripname : tripname,
        CreatedAt : createdAt
    });

    const formattedDate = new Date(createdAt).toLocaleDateString("en-GB",{
        day : "2-digit",
        month : "short",
        year : "numeric"
    });

    const handleClick = async () => {
        try{
            const res = await axiosInstance.get(`/getTrip/${tripId}`);
            navigate("/indiTripDashboard", { state : {tripData}});
        }catch(err){
            //Do something
        }
    }

    const isLongTripname = tripname.length > 10;

    return(
        <>
            <div className="flex w-full max-w-md mt-2 mx-1 h-[109px] rounded-[14px] shadow-xl bg-[rgba(196,196,196,0.1)]"
                onClick={handleClick}
            >
            <div className="flex justify-center items-center my-4 mx-3 w-[73px] h-[73px] bg-[#E8E7E7] rounded-full">
                <p className="text-[28px] font-nunito font-normal leading-[38px] tracking-[0px] text-left text-[#374151]">
                    {tripname.charAt(0).toUpperCase()}{tripname.charAt(tripname.length-1).toUpperCase()}
                </p>
            </div>

            <div className="w-[200px] flex flex-col justify-left "> 
                <p className="relative top-[20px] text-[35px] font-nunito font-semibold italic leading-[48px] tracking-[0px] text-left text-[#374151]">
                    <div className={`scroll-marquee-wrapper ${isLongTripname ? '' : 'overflow-visible'}`}>
                        <span className={isLongTripname ? "scroll-marquee" : ""}>
                             {tripname}
                        </span>
                    </div>
                   
                </p>
                
                <p className="relative top-[13px] text-[20px] font-nunito font-normal italic leading-[27px] tracking-[0px] text-left text-[#374151]">
                    {formattedDate}
                </p>
            </div>
            <div className="w-[86px] flex items-center ">
                <MdKeyboardDoubleArrowRight className="h-[80px] w-[80px] "/>
            </div>
            
        </div>
        </>
    );
}

export default IndiTrip;