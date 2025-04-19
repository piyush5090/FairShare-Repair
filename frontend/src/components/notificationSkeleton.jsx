import React from 'react';

const NotificationSkeleton = () => {
  return (
    <div className="bg-white rounded-[11px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] p-5 w-fit animate-pulse">
      <div className="flex gap-3">
        <div className="mt-1.5">
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
        </div>
        <div className="flex flex-col gap-3 w-64">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-3/4" />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="h-4 w-16 bg-gray-300 rounded-full" />
            <div className="h-4 w-16 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
