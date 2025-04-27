import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const IndiTrip = ({ tripname, tripId, createdAt, index, admin }) => {
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    TripId: tripId,
    Tripname: tripname,
    CreatedAt: createdAt,
    Admin: admin,
  });

  

  const [TripId,setTripId] = useState('');
  

  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleClick = async () => {
    try {
      // navigate("/indiTripDashboard", { state: { TripId : TripId } });
      navigate("/indiTripDashboard", { state: { tripData : tripData } });
      const res = await axiosInstance.get(`/getTrip/${tripId}`);
    } catch (err) {
      // Handle error if needed
    }
  };

  const isLongTripname = tripname.length > 12;

  return (
    <>
      <div
        className="flex w-full max-w-2xl justify-between items-center mx-auto px-4 h-[80px] rounded-[14px] shadow-md bg-[rgba(196,196,196,0.1)] hover:bg-gray-200 mt- cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-center items-center w-[55px] h-[55px] bg-[#E8E7E7] rounded-full">
          <p className="text-[22px] font-nunito font-normal text-[#374151]">
            {tripname.charAt(0).toUpperCase()}
            {tripname.charAt(tripname.length - 1).toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col justify-start items-start flex-1 ml-4">
          <div className="text-[28px] font-nunito text-4xl font-medium italic leading-[36px] text-[#374151]">
            <div className={`scroll-marquee-wrapper ${isLongTripname ? "" : "overflow-visible"}`}>
              <span className={isLongTripname ? "scroll-marquee" : ""}>
                {tripname}
              </span>
            </div>
          </div>

          <p className="text-[14px] font-nunito font-normal italic text-[#374151]">
            {formattedDate}
          </p>
        </div>

        <div className="w-[70px] flex items-center justify-end">
          <MdKeyboardDoubleArrowRight className="h-[60px] w-[60px] text-gray-600" />
        </div>
      </div>
    </>
  );
};

export default IndiTrip;
