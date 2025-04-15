import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import axiosInstance from "../../utils/axiosInstance";
// import IndiPay from "./indiSpendNew";
import IndiPay from "./indiPayNew";
import IndiPaySkeleton from "./indiPaySkeleton"; 
import TripDetailsSkeleton from "./tripDetailsSkeleton";

const History = () => {
  const location = useLocation();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { tripId } = location.state || {};

  const back = () => {
    navigate(-1);
  };

  const fetchPaymentHistory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/${tripId}/paymentHistory`);
      const sortedPaymentHistory = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPaymentHistory(sortedPaymentHistory);

      const tripResponse = await axiosInstance.get(`/getTrip/${tripId}`);
      setTripDetails(tripResponse.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Some unexpected error has occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [tripId]);

  const formattedDate = new Date(tripDetails?.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const isLongTripname = tripDetails?.tripname?.length > 11;

  return (
    <>
      <Navbar back={back} />

      {isLoading ? (
  <TripDetailsSkeleton />
) : (
  <div className="fixed flex items-center justify-between w-screen h-[65px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200 px-3 z-10">
    <div className="w-[261px] flex items-center justify-start">
      <div className="ml-1 w-[50px] h-[50px] bg-gray-300 rounded-full flex justify-center items-center">
        <p className="text-[22px] font-nunito font-normal leading-[38px] text-[#374151]">
          {tripDetails?.tripname?.charAt(0).toUpperCase()}
          {tripDetails?.tripname?.charAt(tripDetails?.tripname?.length - 1).toUpperCase()}
        </p>
      </div>
      <div className="w-[200px] flex flex-col justify-center items-start">
        <p className="relative ml-2 top-[4px] text-[24px] font-nunito font-semibold italic leading-[48px] text-[#374151]">
          <div className={`scroll-marquee-wrapper ${isLongTripname ? "" : "overflow-visible"}`}>
            <span className={isLongTripname ? "scroll-marquee" : ""}>
              {tripDetails?.tripname}
            </span>
          </div>
        </p>
        <p className="relative ml-2 bottom-[7px] text-[14px] font-nunito font-normal italic leading-[27px] text-[#374151]">
          {formattedDate}
        </p>
      </div>
    </div>
  </div>
)}

      <div className="absolute flex flex-col w-full bottom-8 top-36 h-screen overflow-y-auto">
        {isLoading ? (
          // Show 3 skeleton cards while loading
          <>
            <IndiPaySkeleton />
            <IndiPaySkeleton />
            <IndiPaySkeleton />
          </>
        ) : paymentHistory.length > 0 ? (
          paymentHistory.map((payment, index) => (
            <IndiPay key={payment._id || index} index={index + 1} payment={payment} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">No payments yet..</p>
        )}
      </div>
    </>
  );
};

export default History;
