import Dropdown from "./dropdown";
import Navbar from "./navbar";
import IndiTrip from "./indiTripNew";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { filter } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import BottomNavbar from "./bottomNavbar";
import CreateTripForm from "./createTripForm";



const TripsDashboard = () => {

  const [trips,setTrips] = useState([]);
  const [statusFilter,setStatusFilter] = useState('all');
  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [showForm,setShowForm] = useState(false);

  const getAllTrips = async () =>{
    setLoading(true);
      try{
        const res = await axiosInstance.get("/getAllTrips");
        setTrips(res.data);
        setLoading(false);
      }catch(err){
        setLoading(false);
      }
  };

  const handleForm =()=>{
    setShowForm(true);
  }

  const cancelForm =()=>{
    setShowForm(false);
  }

  useEffect(()=>{
    getAllTrips();
  },[]);

  const filteredTrips = trips.filter((trip)=>{
    // const matchesSearch = trip.tripname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || trip.status?.toLowerCase() == statusFilter.toLowerCase();
    return matchesStatus;
  });

  const back = () =>{
    navigate("/dashboard");
  }
  return (
    <>
      <Navbar back={back} />

      <div className="flex flex-col ">
        {/* Header section(trip details) */}
            {showForm && (
          <div className="fixed insert-0 z-20 backdrop-blur-lg bg-black/20 pointer-events-none"></div>
            )}

          <div className="fixed z-10 h-[60px] flex items-center w-screen px-2 justify-between mt-[65px] bg-[#f3fff6]">
              <div className="flex w-full items-center justify-between bg-opacity-100">
                <p className="w-full text-gray-700 font-nunito text-left ml-2 text-2xl font-extrabold">
                  Trips by you:
                </p>
                <Dropdown setStatusFilter={setStatusFilter} statusFilter={statusFilter}/>
              </div>
          </div>
          
      </div>

    

      {isLoading ? (
  <div className="flex flex-col gap-4 mt-32 px-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="flex w-full max-w-2xl justify-between items-center mx-auto px-4 h-[80px] rounded-[14px] shadow-md bg-gray-200 animate-pulse"
      >
        <div className="flex justify-center items-center w-[55px] h-[55px] bg-gray-300 rounded-full"></div>

        <div className="flex flex-col justify-start items-start flex-1 ml-4 gap-2">
          <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
        </div>

        <div className="w-[60px] h-[60px] bg-gray-300 rounded-md"></div>
      </div>
    ))}
  </div>
) : (

        <div className="flex flex-col w-full mt-32 mb-20 h-full gap-4 overflow-scroll">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip,index) => (
                <IndiTrip 
                  key = {trip._id}
                  index = {index+1}
                  tripId = {trip._id}
                  tripname = {trip.tripname}
                  createdAt = {trip.createdAt}
                  admin = {trip.admin}
                />
              ))
            ) : (
              <p>No Trips Found..</p>
            )}
        </div>
      )}
      
      {showForm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
              <CreateTripForm cancelForm={cancelForm} getAllTrips={getAllTrips} />
        </div>
      )}
      
      <div className="fixed flex justify-center items-center bottom-0 w-full h-[62px] left-0 bg-gray-300 shadow-md">
      <div className="mx-2 flex flex-col justify-center items-center h-[140px] w-[80px] mb-3 gap-">
            <div className="flex justify-center items-center h-[80px] w-[80px] rounded-full bg-[rgb(243,255,246)]">
              <IoIosAddCircle className="relative w-[78px] h-[78px] text-[rgb(20,184,166)]" 
                    onClick={handleForm}
              /> 
            </div> 
            <p className="text-[14px] mb-9 mt-1">Create Trip</p>
        </div>   
      </div>


    </>
  );
};

export default TripsDashboard;
