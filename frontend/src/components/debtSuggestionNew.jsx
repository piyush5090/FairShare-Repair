import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import IndiSuggetion from "./indiSuggestionNew";

const Suggestions = () => {
  const navigate = useNavigate();
  const  location = useLocation();
  const[isLoading,setIsLoading] = useState(false);
  const[suggestions,setSuggestions]=useState([]);

  const tripId = location.state?.tripId;

    const fetchSuggestions = async()=>{
        setIsLoading(true);
        try{
            const response = await axiosInstance.get(`/tripSuggestions/${tripId}`);
            console.log(response);
            setSuggestions(response.data.suggestions);
        }catch(err){
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        console.log(tripId);
        fetchSuggestions();
        console.log(suggestions);   
    },[tripId]);


  const back = () => {
    navigate(-1);
  };

  return (
    <>
      <Navbar back={back} />

      <p className="fixed top-[68px] w-full left-[17px] text-left h-[36px] text-[24px] font-extrabold leading-[33px] text-gray-700 font-nunito bg-opacity-100 z-10 bg-[rgb(243,255,246)]">
        Your Trip has ended :-
      </p>

    <div className="fixed top-[105px] px-3 w-full h-[77px] rounded-[12px] bg-opacity-100 z-10 bg-[rgb(243,255,246)]
">       
      <div className="w-full h-[77px] rounded-[12px] bg-[rgba(117,179,248,0.11)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] flex items-center px-3 bg-opacity-100 z-10">
        <p className="font-montserrat text-[22px] font-semibold leading-[1.2] tracking-[0px] text-left">
          Total Trip Cost:- <span className="text-green-700 font-">20000/-</span><br />
          Per Head Share:- <span className="text-green-700">4000/-</span>
        </p>
      </div>
    </div> 

    <p className="fixed top-[194px] left-[13px] w-[355px] h-[36px] text-[22px] font-extrabold leading-[30px] text-gray-700 font-nunito text-left bg-opacity-100 z-10 bg-[rgb(243,255,246)] ">
            Debt Settlement Suggestions:-
    </p>
      

      

    <div className="absolute flex flex-col w-full bottom-8 top-52 h-screen overflow-y-auto">
        <IndiSuggetion />

    </div>
    </>
  );
};

export default Suggestions;
