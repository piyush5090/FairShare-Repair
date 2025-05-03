import Navbar from "./navbar";
import tripBg from '../assets/tripBg.jpg';
import groupBg from '../assets/groupBG.jpg';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Dashboard = () =>{

    const navigate = useNavigate();

    const onGroupClick = () => {
        navigate("/groupDashboard");
    }

    const onTripsClick = () => {    
        navigate("/tripsDashboard");
    }

    return(
        <>
            <Navbar />
            <div className="flex flex-col justify-center w-full px-4 h-[600px]">
            <h2 className="absolute w-[275px] h-[34px] left-[19px] right-[99px] top-[74px] bottom-[744px] text-gray-700 font-inter text-[28px] font-semibold leading-[34px] text-left">
                Select Category:-
            </h2>
            
                <div className="relative flex w-full max-w-md h-[215px] mx-auto top-[35px] bottom-[517px] rounded-[15px] shadow-lg bg-cover bg-center"
                    style={{backgroundImage: `url(${tripBg})`}} onClick={onTripsClick}
                >
                    <div className="absolute inset-0 bg-white bg-opacity-55"></div>

                    <div className="relative flex items-end py-4 justify-around w-full">
                    <p className="relative w-[255px] h-[66px] left-[17px] right-[94px] bottom-[30px] 
                        text-[#451a03] font-nunito text-[18px] font-extrabold italic leading-[25px] text-left"
                            // style={{fontFamily: "Nunito, sans-serif"}}
                        >
                                Going on a trip with friends? Keep track of every expense effortlessly
                    </p>
                    <IoArrowForwardCircleOutline className="relative w-[65px] mb-6 h-[65px] text-[#451a03]" onClick={onTripsClick}/>
                    </div>
                </div>

                <div className="relative flex w-full max-w-md h-[215px] mx-auto top-[50px] bottom-[517px] rounded-[15px] shadow-lg bg-cover bg-center"
                    style={{backgroundImage: `url(${groupBg})`}} onClick={onGroupClick}
                >
                    <div className="absolute inset-0 bg-white bg-opacity-55"></div>
                    
                    <div className="relative flex flex-col items-end gap-20 w-full">
                    <div className="relative mb- h-[25px] rounded-b-[10px] w-[150px] bg-blue-400"> 
                        <p className="text-white font-[nunito]">Upcoming....</p>
                    </div>
                    <div className="flex ">
                        <p className="w-[255px] h-[66px]
                            text-[#451a03] font-nunito text-[18px] font-extrabold italic leading-[25px] text-left"
                                // style={{fontFamily: "Nunito, sans-serif"}}
                            >
                                    Living with roommates? Manage shared expenses hassle-free!
                        </p>
                        <IoArrowForwardCircleOutline className="relative w-[65px] mb-6 mr-3 h-[65px] text-[#451a03]" onClick={onGroupClick}/>
                    </div>
                    </div>
                </div>



                    
                    
            </div>

            

        </>
    );
}

export default Dashboard;