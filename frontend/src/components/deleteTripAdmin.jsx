import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DeleteTripAdmin = ({ handleDeleteAdmin, userId, currTrip, setShowDelete, isLoading }) =>{
  const navigate = useNavigate();

    return(
      <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"></div>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center flex-col gap-4 w-[342px] h-[200px] border border-[#75B3F8] rounded-[33px] bg-slate-300">
            {isLoading ? (
                <p className="w-[335px] h-[91px] mt-4 text-black font-nunito text-[20px] font-semiabold leading-[41px] text-center">
                  Deleting
                </p>
            ) : (
              <p className="w-[335px] h-[91px] mt-4 text-[rgb(248,51,51)] font-nunito text-[26px] font-semiabold leading-[41px] text-center">
                You are Admin <br />if you delete the trip, it will be deletd from all members
              </p>
            )}

            <div className="flex justify-around items-center w-[312px] h-[47px]">
        <button class="w-[117px] mx-2 h-[45px] rounded-[21px] bg-blue-300 text-white font-bold"
            onClick={()=>{setShowDelete(false)}}
        >
            Cancel
        </button>

          <button className="w-[117px] mx-2 h-[45px] rounded-[21px] bg-red-600 text-white font-bold"
            onClick={handleDeleteAdmin}
          >
              {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
          </div>
        </div>
      </>
    );
}

export default DeleteTripAdmin;