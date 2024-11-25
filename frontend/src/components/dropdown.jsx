import React from 'react';

const Dropdown = ({ setStatusFilter, statusFilter }) => {
  const handleChange = (e) => {
    setStatusFilter(e.target.value); // Update the status filter state
  };

  return (
      <div className="relative w-30 2xl:w-64 xl:w-64 md:w-64 sm:w-64">
        <select
          id="statusDropdown"
          value={statusFilter}
          onChange={handleChange}
          className="w-full max-w-screen px-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
  );
};

export default Dropdown;
