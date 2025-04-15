import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EndTrip = ({ handleEnd, currTrip }) =>{
  const navigate = useNavigate();

  const confirmEndTrip = async () => {
    console.log("Trip has ended.");
    try {
        // Make the API call to end the trip
        const response = await axiosInstance.post(`/api/trip/end/${currTrip?._id}`);
        
        // Log the result in the console
        console.log("End Trip Response:", response.data);

        // Redirect to the TripSuggestion page with tripId
        navigate("/suggestions", { state: { tripId: currTrip?._id } });

    } catch (error) {
        console.error("Error ending trip:", error);
    } finally {
        //setShowEndTripModal(false);
        //setShowPopup(false);
    }
};

    return(
      <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center"></div>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center flex-col gap-4 w-[342px] h-[200px] border border-[#75B3F8] rounded-[33px] bg-slate-300">
            <p className="w-[335px] h-[91px] mt-4 text-[rgb(248,51,51)] font-nunito text-[30px] font-semiabold leading-[41px] text-center">
                Are you sure <br />want to End this Trip?
            </p>

            <div className="flex justify-around items-center w-[312px] h-[47px]">
        <button class="w-[117px] mx-2 h-[45px] rounded-[21px] bg-blue-300 text-white font-bold"
            onClick={handleEnd}
        >
            Cancel
        </button>

          <button className="w-[117px] mx-2 h-[45px] rounded-[21px] bg-red-600 text-white font-bold"
            onClick={confirmEndTrip}
          >
              End
          </button>
        </div>
          </div>
        </div>
      </>
    );
}

export default EndTrip;