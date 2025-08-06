import { IoChevronBackOutline } from "react-icons/io5";
import logo from '../assets/onlylogo.png';
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import axiosInstance from "../../utils/axiosInstance";

const SignupForm = () =>{
    const navigate = useNavigate();

    const [users,setUsers]=useState({
        Fullname:"",
        Username:"",
        Email:"",
        Password:""
    });

    const[error,setError] = useState(null);
    const[isLoading, setIsLoading]=useState(false);
    const[showPassword,setShowPassword]=useState(false);

    const togglePassword = () =>{
        setShowPassword(prev => !prev);
    };

    function changeUSers(event){
        const {id,value} = event.target;
        setUsers(prevState => ({
            ...prevState,
            [id]:value
        }))
    }
    const handleBack = () =>{
        navigate("/intro");
    }

    const goToLogin = () =>{
        navigate("/login");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
            const res = await axiosInstance.post("signup",{ users });
            if(res.data.error==false){
                const response = res.data.message;
                localStorage.setItem("token",res.data.accessToken);
                navigate("/dashboard",{state : response});
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }else{
                setError("An unexpected error has occured. Try again later.");
            }
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <>
            <div className="w-full flex h-16 left-[-3px] py-1 right-[3px] top-0 bottom-0 bg-gray-400 bg-opacity-75">
                <IoChevronBackOutline className="ml-[1px] h-[50px] w-[50px]" onClick={handleBack}/>
                <img src={logo} className="relative h-[50px] w-[50px] my-[2px]"></img>
            </div>

            <div className="flex justify-center mt-20">
                <div className="relative h-[486px] w-[330px] rounded-[39px] shadow-md bg-gray-200 flex flex-col items-center justify-center p-4 gap-3">
                        <h2 className="text-teal-600  font-lexend text-[36px] font-normal leading-[45px]">
                            Signup
                        </h2>


                <div className="flex items-center w-[308px] h-[56.83px] bg-white border border-teal-500 px-3 rounded-3xl"> 
                <FaRegUser className="w-[22px] h-[22.92px] ml-1 text-gray-500"/>
                    <input 
                        type="text"
                        placeholder="fullname"
                        id="Fullname"
                        className="w-full ml-1 px-2 h-full outline-none bg-transparent rounded-r-3xl"
                        onChange={changeUSers}
                    >
                    </input>
                </div>

                <div className="flex items-center w-[308px] h-[56.83px] bg-white border border-teal-500 px-3 rounded-3xl">
                <CiAt className="w-[26px] h-[26.92px] ml-[1.2px] text-gray-800"/>  
                    <input
                        type="text"
                        placeholder="username"
                        id="Username"
                        className="w-full ml-1 px-2 h-full outline-none bg-transparent rounded-3xl"
                        onChange={changeUSers}
                    >
                    </input>
                </div>

                <div className="flex items-center w-[308px] h-[56.83px] bg-white border border-teal-500 px-3 rounded-3xl">
                    <TfiEmail className="w-[22px] h-[22.92px] text-gray-500" />
                    <input
                        type="email"
                        placeholder="Email"
                        id="Email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-full ml-2 px-2 h-full outline-none bg-transparent rounded-r-3xl"
                        onChange={changeUSers}
                    />  
                </div>

               
                <div className="flex items-center w-[308px] h-[56.83px] bg-white border border-teal-500 px-3 rounded-3xl">
                    <RiLockPasswordLine className="w-[24px] h-[24.92px] text-gray-500" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="Password"
                        className="w-full ml-2 px-2 h-full outline-none bg-transparent rounded-r-3xl"
                        onChange={changeUSers}
                    />
                        <button
                            type="button"
                            className="relative text-gray-600 right-1 focus:outline-none"
                            onClick={togglePassword}
                        >
                            {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20} />}
                        </button>
                </div>

                {error && <p className="text-red-500 font-medium text-sm mb-4">{error}</p>}

                    {/* Submit Button */}
                <button className="w-[205px] h-[53.83px] border border-blue-300 rounded-[67px] bg-blue-300 text-gray-100 font-lexend text-[24px] font-normal leading-[30px] flex justify-center items-center cursor-pointer hover:bg-blue-400 "
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? "Signing in..." : "Submit"}

                </button>

                <div>
                    <p className="text-gray-700 font-lexend text-[20px] font-normal leading-[25px] tracking-[0px] text-left">
                        Already have an account ?
                    </p>
                    <a className="text-blue-400 font-lexend text-[18px] font-normal leading-[23px] tracking-[0px] text-left" onClick={goToLogin} >
                        Login
                    </a>
                </div>

                
                </div>
            </div>
        </>
    );
}

export default SignupForm;
