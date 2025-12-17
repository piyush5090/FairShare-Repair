import { useNotifications } from "../contexts/NotificationContext";
import NotificationCard from "./notificationCard";
import { BiMessageError } from "react-icons/bi";
import NotificationSkeleton from './notificationSkeleton';

const Notifications = ({ userInfo, handleBell }) => {
    const { notifications, isLoading, fetchNotifications } = useNotifications();

    return (
        <>
            <div className="w-screen px-2 h-screen flex rounded-[33px] bg-[#f3fff6]">
                <div className="fixed inset-0 flex p-3 flex-col items-center top-[50px] w-full h-[694px] border border-[#75b3f8] rounded-[33px] bg-[#f3fff6] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-[50px] z-40">
                    {/* Heading */}
                    <div className="w-[328px] h-[47px] left-[8.7px] right-[9.05px] top-0 bottom-[-5px] text-[#7a7171] font-nunito text-[30px] font-extrabold leading-[41px] tracking-[0px] text-center">
                        Notifications
                    </div>

                    {/* Users section */}
                    <div className="w-full px-2 h-full mt-3 mb overflow-scroll">
                        {isLoading ? (
                            <>
                                <NotificationSkeleton />
                                <NotificationSkeleton />
                            </>
                        ) : notifications.length > 0 ? (
                            notifications.map((info) => (
                                <NotificationCard key={info._id} userInfo={userInfo} info={info} getUserInfo={fetchNotifications} handleBell={handleBell} />
                            ))
                        ) : (
                            <div className="flex flex-col justify-center h-full items-center">
                                <BiMessageError className="h-[60px] w-[60px] text-red-500" />
                                <p>No new notifications..</p>
                            </div>
                        )}
                    </div>

                    <div className="w-full h-[70px] bg-[#f3fff6] rounded-[33px] flex items-end justify-around">
                        <button className="h-[40px] font-montserrat w-[100px] font-normal bg-slate-300 rounded-[33px]"
                            onClick={handleBell}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notifications;