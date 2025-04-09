// src/components/Navbar.jsx

import React, { useEffect, useState, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/profileInfo";
import axiosInstance from "../../utils/axiosInstance"; // Correct path for your axios instance
import logo from '../assets/onlylogo.png';
const Navbar = ( {back} ) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const navigate = useNavigate();
    const navbarRef = useRef(null);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/getUser");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/");
            }
        } finally {
            setLoading(false); // Set loading to false when the request finishes
        }
    };

    const onLogout = () => {
        localStorage.clear();
        navigate("/"); // Redirect to home on logout
    };

    useEffect(() => {
        getUserInfo(); // Fetch user info when the component mounts
    }, []);

    const handleBack = () =>{
        back();
    }

    return (
        <div ref={navbarRef} className="fixed w-full flex justify-between h-16 left-[-3px] py-1 right-[3px] top-0 bottom-0 bg-gray-400 bg-opacity-75">
            <div className="flex">
            <IoChevronBackOutline className="ml-[1px] h-[50px] w-[50px]" onClick={handleBack}/>
                <img
                    className="h-[50px] w-[50px]" // Set height and width
                    src={logo} // Using the imported logo
                    alt="Your Logo" // Replace with your logo's alt text
                />
            </div>
            
            <div className="flex items-center gap-4 mr-3">
                {loading ? ( // Show loading state while fetching user info
                    <div className="flex items-center space-x-2">
                        <div className="loader"></div>
                        <p>Loading...</p>
                    </div>
                ) : userInfo ? ( // Show ProfileInfo when userInfo is available
                    <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                ) : (
                    // Show Logout button when no user data is found
                    <button 
                        onClick={onLogout} 
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
