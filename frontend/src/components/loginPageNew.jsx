import { RiLockPasswordLine } from "react-icons/ri";
import { TfiEmail } from "react-icons/tfi";
import { IoChevronBackOutline } from "react-icons/io5";
import logo from '../assets/onlylogo.png';
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";



const LoginForm = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({
        Email: "",
        Password: ""
    });
    const[showPassword,setShowPassword]=useState(false);

    const handleBack = () =>{
        navigate("/intro");
    }

    const[error,setError] = useState(null);
    const[isLoading, setIsLoading]=useState(false);

    function changeUSers(event) {
        const { id, value } = event.target;
        setUsers(prevState => ({
            ...prevState,
            [id]: value
        }));
    }

    const onGoSignup = ()=>{
        navigate("/signup");
    }

    const togglePassword = () =>{
        setShowPassword(prev => !prev);
    };

    async function handleSubmit(event){
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try{
            
            const res = await axiosInstance.post("/login",{ users });
            if(res.data.error == false){
                const response = res.data;
                localStorage.setItem("token",res.data.accessToken);
                navigate("/dashboard",{ state : response });
                console.log("Post req sent successfully");
            }else{
                setError("Login failed. Please try again.");
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }else{
                setError("An Unexpected error has occured. Try again later.")
            }
        }finally{
            setIsLoading(false);
        }
    }

  return (
    <>
    <div className="w-full flex h-16 left-[-3px] py-1 right-[3px] top-0 bottom-0 bg-gray-400 bg-opacity-75">
        <IoChevronBackOutline className="ml-[1px] h-[50px] w-[50px]" onClick={handleBack}/>
        <img src={logo} className="relative h-[50px] w-[50px] my-[2px]"></img>
    </div>

    <div className="flex justify-center items-center h-[800px]">

    
    <form className="relative w-[330px] h-[363px] rounded-[39px] shadow-md bg-gray-200 flex flex-col items-center justify-center p-4 gap-3"
            onSubmit={handleSubmit}
        >
      {/* Login Heading */}
      <h2 className="text-teal-600  font-lexend text-[36px] font-normal leading-[45px]">
        Login
      </h2>

      {/* Email Input Field */}
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

      {/* Password Input Field */}
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
      >
        {isLoading ? "Logging in..." : "Submit"}

      </button>

      <div>
        <p className="text-gray-700 font-lexend text-[20px] font-normal leading-[25px] tracking-[0px] text-left">
            Don't have an account ?
        </p>
        <a className="text-blue-400 font-lexend text-[18px] font-normal leading-[23px] tracking-[0px] text-left" onClick={onGoSignup}>
            Create New Account
        </a>
      </div>
    </form>
    </div>
    </>
  );
};

export default LoginForm;
