import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateTripForm = ( { cancelForm, getAllTrips })=>{

    const[change,setChange] = useState("");
    const[isLoading,setIsLoading]=useState(false);
    const navigate = useNavigate();

    function changeEvent(event){
        event.preventDefault();
        const { id,value } = event.target;
        setChange(prevState => ({
            ...prevState,
            [id]:value
        }));
    }

    const handleCancel = ()=>{
        cancelForm();
    }

    const handleCreate = async ()=>{
        setIsLoading(true);
        try{
            const res = await axiosInstance.post("/newTrip",{change});
            navigate("/tripsDashboard");
            getAllTrips();
            cancelForm();
        }catch(err){
            console.log(err);
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <>
        <div className="flex justify-center items-center h-[800px] backdrop-blur-[50px]">
      <div className="flex w-[342.11px] h-[216px] border border-[#75b3f8]  shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[10px] rounded-[33px] bg-slate-300 p-4">
        <div className="flex flex-col justify-start items-center gap-4 w-full">
          <p className="text-[30px] leading-[41px] font-semibold text-gray-700 text-center font-[Nunito]">
            Create New Trip
          </p>

          <div className="relative w-[312px] h-[47px] rounded-[12px] bg-[#fbfbfb]">
            <input
            onChange={changeEvent}
            id="tripName"
              type="text"
              placeholder="Trip Name"
              className="w-full h-full px-4 rounded-[12px] bg-[#fbfbfb] outline-none font-[Nunito]"
            />
          </div>

          <div className="flex justify-between gap-8 mt-2 ">
          <button className="w-[117px] h-[45px] rounded-[21px] bg-[#93c5fd] text-[20px] leading-[27px] 
                            font-semibold text-[#fbfbfb] text-center font-[Nunito] "
                                onClick={handleCancel}
                            >
            Cancel
          </button>

          <button className="w-[117px] h-[45px] rounded-[21px] bg-[#76c67f] text-[20px] leading-[27px] 
                            font-semibold text-[#fbfbfb] text-center font-[Nunito] "
                                onClick={handleCreate}
                            >
                                {isLoading ? "Creating.." : "Create"}
          </button>

          </div>
        </div>
      </div>
    </div>
            

        </>
    );
}

export default CreateTripForm;
