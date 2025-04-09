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

    {showForm && (
      <div className="fixed insert-0 z-20 backdrop-blur-lg bg-black/20 pointer-events-none"></div>
    )}

      <div className="fixed top-12 flex items-end justify-between px-5 mt-6 gap-10">
        <p className="text-gray-700 font-nunito text-2xl font-extrabold leading-[33px]">
          Trips by you:
        </p>
        <Dropdown setStatusFilter={setStatusFilter} statusFilter={statusFilter}/>
      </div>

      {isLoading ? (
        <div className="Flex justify-center items-center min-h-screen">
          <div className="loader"></div>
          <p>Loading you trips...</p>
        </div>
      ) : (
        <div className="absolute flex flex-col w-full top-32 h-screen">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip,index) => (
                <IndiTrip 
                  key = {trip._id}
                  index = {index+1}
                  tripId = {trip._id}
                  tripname = {trip.tripname}
                  createdAt = {trip.createdAt}
                />
              ))
            ) : (
              <p>No Trips Found..</p>
            )}
        </div>
      )}

      
            <IoIosAddCircle className="fixed w-[90px] h-[90px] left-[288px] right-[20px] top-[696px] bottom-[79px] text-[rgb(20,184,166)]" 
              onClick={handleForm}
            />
      
      {showForm && (
        <CreateTripForm cancelForm={cancelForm} getAllTrips={getAllTrips} />
      )}
      
      <BottomNavbar />

    </>
  );
};

export default TripsDashboard;
