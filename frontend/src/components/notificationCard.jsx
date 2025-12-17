import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const NotificationCard = ({ userInfo, info, getUserInfo, handleBell }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formattedDate = new Date(info.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const onAdd = async () => {
    setIsLoading(true);
    try {
      // 1. Add user to the trip
      await axiosInstance.post(`/api/trips/${info.trip._id}/members`, {
        userId: userInfo._id,
      });

      // 2. Delete the notification
      await axiosInstance.delete(`/api/notifications/${info._id}`);
      
      getUserInfo(); // This is now fetchNotifications() from the parent
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onReject = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/api/notifications/${info._id}`);
      getUserInfo(); // This is now fetchNotifications() from the parent
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const message = `invited you to join "${info.trip.tripname}"`;

  return (
    <div className="bg-[#f2f3f7] border-[1.5px] border-[#f2f3f7] rounded-xl shadow-[1em_1em_1em_#d8dae0b1,-0.75em_-0.75em_1em_#ffffff] cursor-pointer w-fit p-4 mt-2">
      {isLoading ? (
        <div className="flex items-center justify-center h-24 w-64">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-row gap-3">
          <div className="mt-1.5">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1 text-[#333]">
              <p className="text-content">
                <a href="#" className="text-black font-medium no-underline">
                  {info.sender.username}
                </a>{' '}
                {message}
              </p>
              <p className="text-sm text-[#777]">{formattedDate}</p>
            </div>
            <div className="flex flex-row items-center justify-around">
              <button
                className="text-[#666] h-[25px] w-[80px] rounded-full font-normal text-[15px] bg-slate-200"
                onClick={onReject}
              >
                Reject
              </button>
              <button
                className="text-white h-[25px] w-[80px] font-semibold text-[12px] rounded-full bg-green-400"
                onClick={onAdd}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;

