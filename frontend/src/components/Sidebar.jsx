import React from 'react';
import { FaUser, FaClock, FaCircle } from 'react-icons/fa';

const Sidebar = () => {
  const users = [
    { id: 1, name: 'John Doe', status: 'online' },
    { id: 2, name: 'Jane Smith', status: 'online' },
  ];

  return (
    <div className="w-sidebar min-w-[250px] bg-white h-full shadow-lg">
      <div className="p-4 space-y-6">
        {/* Users Section */}
        <div>
          <h2 className="text-subtitle font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaUser className="text-accent-500" /> 
            <span>Users</span>
          </h2>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} 
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-all">
                <FaCircle className="text-green-500 w-2 h-2" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro Timer */}
        <div className="pt-4 border-t border-gray-100">
          <h2 className="text-subtitle font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaClock className="text-accent-500" />
            <span>Pomodoro Timer</span>
          </h2>
          <div className="text-center space-y-3">
            <div className="text-3xl font-bold text-gray-800 tracking-tight">25:00</div>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-accent-500 text-white rounded-lg text-sm font-medium hover:bg-accent-600 active:transform active:scale-95 transition-all">
                Start
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 active:transform active:scale-95 transition-all">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;