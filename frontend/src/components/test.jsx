const EndTrip = () =>{
    return(
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="flex items-center flex-col gap-4 w-[342px] h-[200px] border border-[#75B3F8] rounded-[33px] bg-gray-200">
            <p className="w-[335px] h-[91px] mt-4 text-[rgb(248,51,51)] font-nunito text-[30px] font-extrabold leading-[41px] text-center">
                Are you sure <br />want to End this Trip?
            </p>

            <div className="flex justify-around items-center w-[312px] h-[47px]">
        <button class="w-[117px] mx-2 h-[45px] rounded-[21px] bg-blue-300 text-white font-bold">
            Cancel
        </button>

          <button className="w-[117px] mx-2 h-[45px] rounded-[21px] bg-[rgb(248,51,51)] text-white font-bold">
              End
          </button>
        </div>
          </div>
        </div>
      </>
    );
}

export default EndTrip;