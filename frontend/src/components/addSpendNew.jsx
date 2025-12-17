import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import { FaExclamation } from "react-icons/fa";


const AddSpend = ({ handleShowAddSpend, tripId, refreshTripData }) =>{

    const[isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState('');

  const [data,setData] = useState({
    amount: "",
    Where: ""
  });

  const where = data?.Where;


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const numericAmount = parseFloat(data?.amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        setError('Please enter positive amount.');
        return;
    }

    if (!where.trim()) {
        setError('Please specify where..');
        return;
    }

    setError('');

    setIsLoading(true);
    try{
        const response = await axiosInstance.post(`/api/trips/${tripId}/expenses`,{ 
            amount : numericAmount,
            description: where,
         });

         if(response.status == 201){
            refreshTripData();
            handleShowAddSpend();
         }else{
            setError("An error has occured");
         }
    }catch(err){
        console.log(err);
    }finally{
        setIsLoading(false);
    }
  }

  function onChange(event){
    const { id, value } = event.target;
    setData(prevState =>({
      ...prevState,
      [id] : value
    }));
  }

  useEffect(()=>{
    console.log(tripId);
},[]);

  return(
    <>
    <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"></div>
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex inset-0 z-50 flex-col items-center w-[342px] h-[285px] border border-[#75B3F8] backdrop-blur-sm transition-opacity duration-300 rounded-[33px] bg-slate-300">
        <p className="text-[30px] font-nunito font-semibold mt-4 leading-[41px] tracking-[0px] text-center text-[#374151]">
          Add New Spend
        </p>

        <div className="flex items-center justify-center w-[312px] h-[47px] rounded-[12px] mt-4 bg-[#FBFBFB]">
        <input
            id="amount"
            type="number"
            min="0"
            step="1"
            placeholder="Enter Amount"
            className="w-full h-full px-4 rounded-[12px] bg-[#fbfbfb] font-semibold outline-none"
            onChange={onChange}
        />

        </div>

        <div className="w-[312px] h-[47px] rounded-[12px] mt-4 bg-[#FBFBFB]">
        <input
            id="Where"
            type="text"
            placeholder="Where?"
            className="w-full h-full px-4 rounded-[12px] bg-[#fbfbfb] font-semibold outline-none"
            onChange={onChange}
        />

        {error && <p className="flex justify-center items-center text-red-700 font-medium mt-1">
          <FaExclamation className="h-[12px] w-[12px]"/>{error} </p>}

        </div>

        <div className="flex justify-around items-center w-[312px] h-[47px] mt-8">
        <button class="w-[117px] mx-2 h-[45px] rounded-[21px] bg-blue-300 text-white font-bold"
            onClick={handleShowAddSpend}
        >
            Cancel
        </button>

          <button className="w-[117px] mx-2 h-[45px] rounded-[21px] bg-[rgb(118,198,127)] text-white font-bold"
            onClick={handleSubmit}
          >
              {isLoading ? "Adding.." : "Add"}
          </button>
        </div>
      </div>
      </div>  
    </>
  );
}

export default AddSpend