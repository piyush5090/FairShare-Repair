import { SiPhonepe } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa";
import { currUser } from "../contexts/UserContext";

const IndiSuggetion = ({ suggestion, index }) => {
  const { userInfo } = currUser();

  const avatarColors = [
    "#A7D2CB", // mint green
    "#F2B5D4", // soft pink
    "#F7D9C4", // peach beige
    "#C3FBD8", // light mint
    "#B5C0D0", // dusty lavender
    "#FFF4B1", // soft yellow
    "#D7E3FC", // powder blue
    "#FFDDD2", // coral tint
    "#E0BBE4", // pastel purple
    "#BEE1E6"  // light aqua
  ];

  const fromMemberFullname = suggestion.from.fullname;
  const toMemberFullname = suggestion.to.fullname;
  const fromMemberUsername = suggestion.from.username;
  const toMemberUsername = suggestion.to.username;
  const amount = suggestion.amount;
  const upiId = suggestion.to.upiId;

  const avatarBgColor = avatarColors[index % avatarColors.length];
  const avatarBgColor2 = avatarColors[index * 2 % avatarColors.length];
  const nameParts1 = fromMemberFullname.trim().split(" ");
  const nameParts2 = toMemberFullname.trim().split(" ");
  const isLongFromMemberFullname = fromMemberFullname?.length > 15;
  const isLongToMemberFullname = toMemberFullname?.length > 13;

  const handlePay = () => {
    if (!upiId || upiId.trim() === "" || !amount || amount <= 0) {
      alert("Missing UPI ID or amount.");
      return;
    }

    const url = `upi://pay?pa=${upiId}&pn=FairShare%20Payment&am=${amount}&cu=INR&tn=Payment%20for%20FairShare`;
    window.location.href = url;
  };

  return (
    <>
      <div className="flex justify-center mb-2 items-center px-3 flex-col w-full h-[240px] ">
        <div className="flex flex-col p-3 w-full h-[190px] rounded-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] bg-[rgba(242,236,236,0.17)]">
          {/* first section */}
          <div className="flex w-full h-[65px] justify-between rounded-[15px] bg-[rgba(242,236,236,0.17)]">
            <div className="px-1 justify-center items-center flex">
              <div
                className="flex items-center justify-center w-[50px] h-[50px] rounded-[14px]"
                style={{ backgroundColor: avatarBgColor }}
              >
                <p className="text-[18px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                  {nameParts1[0]?.charAt(0).toUpperCase()}
                  {nameParts1[1]?.charAt(0).toUpperCase()}
                </p>
              </div>

              <div className="w-auto flex flex-col items-start">
                <p className="mx-2 text-[18px] font-[Montserrat] font-semibold italic leading-[27px] tracking-[0px] text-left text-blue-500 ">
                  {isLongFromMemberFullname ? `${fromMemberFullname?.slice(0, 12)}...` : fromMemberFullname}
                  <span className="relative top-3 ml-3 text-gray-800 text-[20px] font-semibold">can pay</span>
                </p>

                <p className="mx-2 text-[13px] font-[Montserrat] font-medium italic leading-[21px] tracking-[0px] text-left text-gray-600">
                  @{fromMemberUsername}
                </p>
              </div>
            </div>
          </div>

          {/* second section */}
          <div className="flex w-full h-[60px] justify-between rounded-[15px] bg-[rgba(242,236,236,0.17)]">
            <div className="flex items-center h-[65px] ml-2 w-[140px]">
              <span className="text-green-600 flex font-montserrat text-[22px] font-semibold leading-[34px] tracking-[0px] text-left">
                {amount.toFixed(2)}/-
              </span>
            </div>

            <div className="flex w-[50px] h-[65px] justify-end items-center font-montserrat text-gray-800 text-[22px] font-semibold leading-[40px] tracking-[0px] text-right">
              <p className=" relative text-gray-800 font-semibold ">to </p>
            </div>

            <div className="flex w-full h-[65px] justify-end rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
              <div className="px-1 justify-center items-center flex">
                <div
                  className="flex items-center justify-center w-[50px] h-[50px] rounded-[14px]"
                  style={{ backgroundColor: avatarBgColor2 }}
                >
                  <p className="text-[18px] font-nunito font-normal leading-[38px] tracking-[0px] text-left">
                    {nameParts2[0]?.charAt(0).toUpperCase()}
                    {nameParts2[1]?.charAt(0).toUpperCase()}
                  </p>
                </div>

                <div className="w-auto flex flex-col items-start">
                  <p className="mx-2 text-[18px] font-[Montserrat] font-semibold italic leading-[27px] tracking-[0px] text-left text-blue-500 ">
                    {isLongToMemberFullname ? `${toMemberFullname?.slice(0, 11)}...` : toMemberFullname}
                  </p>

                  <p className="mx-2 text-[13px] font-[Montserrat] font-medium italic leading-[21px] tracking-[0px] text-left text-gray-600">
                    @{toMemberUsername}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className={`w-full flex gap-2 items-center justify-center mt-3 h-[45px] rounded-[20px] 
                    ${userInfo?.username !== fromMemberUsername
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-200 hover:bg-indigo-300'}
                 `}
          onClick={handlePay}
          disabled={userInfo?.username !== fromMemberUsername}
        >
          <p className="text-[rgb(55,65,81)] flex font-[Montserrat] text-[16px] font-medium leading-[24px] tracking-[0px] text-left">
            Pay via UPI
          </p>
          <SiPhonepe />
          <SiPaytm className="h-[30px] w-[30px]" />
          <FaGooglePay className="h-[35px] w-[35px]" />
        </button>
      </div>
    </>
  );
}

export default IndiSuggetion;