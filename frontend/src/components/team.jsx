import piyush from '../assets/piyushImg3.png';
import parul from '../assets/parulFull.png';
import nilesh from '../assets/nileshFull.png.png';
import verma from '../assets/vermaFull.png';



const Team = () =>{
    return(
        <>
        <div className="flex items-center justify-center my-9 ">
            <div className="flex flex-wrap w-[310px] h-[310px] rotate-[-45deg rounded-[70px] shadow-md border border-grya-400 bg-[#c4c4c4] rotate-[45deg]">
            <div className="flex w-1/2 h-1/2 bg-[#F3FfF6] rounded-tl-[71px] border border-gray-200 overflow-hidden">
                <img
                    className="w-full h-full object-cover rotate-[-45deg]"
                    src={piyush}
                    alt="Piyush"

                />
            </div>

            <div className="flex w-1/2 h-1/2 bg-[#F3FfF6] rounded-tr-[71px] border border-gray-200 overflow-hidden">
                <img
                    className="w-full h-full object-cover rotate-[-45deg]"
                    src={parul}
                    alt="Parul"
                />
            </div>

            <div className="flex w-1/2 h-1/2 bg-[#F3FfF6] rounded-bl-[71px]  border border-gray-200 overflow-hidden">
                <img
                    className="w-full h-full object-cover rotate-[-45deg]"
                    src={nilesh}
                    alt="Parul"
                />
            </div>

            <div className="flex w-1/2 h-1/2 bg-[#F3FfF6] border border-gray-200 rounded-br-[71px] overflow-hidden">
                <img
                    className="w-full h-full object-cover rotate-[-45deg]"
                    src={verma}
                    alt="Verma"
                />
            </div>
            </div>
        </div>
            
        </>
    )
}

export default Team;