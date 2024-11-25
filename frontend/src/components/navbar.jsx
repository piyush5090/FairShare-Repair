// src/components/Navbar.jsx

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../cards/profileInfo";
import axiosInstance from "../../utils/axiosInstance"; // Correct path for your axios instance
import logo from "../assets/logoInt.jpg"; // Update this path based on your project structure

const Navbar = () => {
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

    return (
        <div ref={navbarRef} className="bg-white h-16 flex items-center justify-between px-4 py-2 drop-shadow relative">
            <h2 
                className="site-name flex flex-row items-center cursor-pointer" 
                onClick={() => navigate('/dashboard')} // Navigate to dashboard on logo click
            >
                <img
                    className="h-10 w-32" // Set height and width
                    src={logo} // Using the imported logo
                    alt="Your Logo" // Replace with your logo's alt text
                />
            </h2>
            <div className="flex items-center gap-4">
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
