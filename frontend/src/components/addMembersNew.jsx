import { CiSearch } from "react-icons/ci";
import IndiUser from "./indiUserNew";
import axiosInstance from "../../utils/axiosInstance";
import { useState, useEffect } from "react";
import { all } from "axios";



const AddMembers = ({tripData, getTripDetails, handleUsers})=>{

    const[allUsers,setAllusers] = useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[searchQuery,setSearchQuery]=useState("");

    const getAllUsers = async () =>{
        setIsLoading(true);
        try{
            const response = await axiosInstance.get("/getAllUsers");
            setAllusers(response.data.allUsers);

        }catch(err){    
            console.error(err);
        }finally{
            // setIsLoading(false);
        }
    };

    useEffect(()=>{
        getAllUsers();
        if(allUsers) console.log(allUsers);
    },[tripData]);

    const handleSearchBar =(event)=>{
        setSearchQuery(event.target.value);
    }

    const filteredUsers =searchQuery ? 
        allUsers?.filter((user)=>
        user?.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    ) : allUsers;

  return(
    <>
      <div className="w-screen px-2 h-screen flex rounded-[33px] bg-[#f3fff6]">
        <div className="fixed inset-0 flex p-3 flex-col items-center top-[50px] w-full h-[694px] border border-[#75b3f8] rounded-[33px] bg-[#f3fff6] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-[50px] z-40">
          {/* Heading */}
          <div className="w-[328px] h-[47px] left-[8.7px] right-[9.05px] top-0 bottom-[-5px] text-[#7a7171] font-nunito text-[30px] font-extrabold leading-[41px] tracking-[0px] text-center">
            Invite Members
          </div>

          {/* Search bar */}
          <div className="w-full flex justify- items-center px-3 h-[42px] box-border border border-[#451a03] rounded-[11px] bg-[#fbfbfb]">
            <input 
              className="w-full h-[38px] rounded-[11px] bg-[#fbfbfb] outline-none font-montserrat text-[17px] font-medium"
              placeholder="Search"
              id="search"
              name="search"
              type="search"
              value={searchQuery}
              onChange={handleSearchBar}
            />
            <CiSearch className="w-[32px] h-[32px]"/>
          </div>


          {/* Users section */}
          <div className="w-full h-full mt-3 mb overflow-scroll">
            {filteredUsers?.length > 0 ? (
             filteredUsers.map((user, index)=>(
                <IndiUser 
                    key={user._id}
                    user={user}
                    username={user.username}
                    fullname={user.fullname}
                    email={user.email}
                    tripData={tripData}
                    index={index+1}
                />
             ))   
                
                    ) : (
                    <p>No Users found...</p>
                    )}
            </div>

            {/* Cancel & done */}
            <div className="w-full h-[70px] bg-[#f3fff6] rounded-[33px] flex items-center justify-around">
                    <button className="h-[40px] font-montserrat w-[100px] font-normal bg-slate-300 rounded-[33px]"
                        onClick={handleUsers}
                    >
                        Cancel
                    </button>

                    <button className="h-[40px] w-[100px] font-montserrat font-normal bg-green-300 rounded-[33px]"
                        onClick={handleUsers}
                    >
                        Done
                    </button>
            </div>      


        </div>
      </div>

    </>
  );
}

export default AddMembers;