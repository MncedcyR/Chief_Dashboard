import React from 'react';
import { BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
interface HeaderProps {
  onLogout: () => void;
}
const Header: React.FC<HeaderProps> = ({
  onLogout
}) => {
  return <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Police Administration Dashboard
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <BellIcon size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <UserIcon size={20} className="text-gray-600" />
        </button>
        <button onClick={onLogout} className="flex items-center text-gray-700 hover:text-red-600">
          <LogOutIcon size={18} className="mr-1" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </header>;
};
export default Header;