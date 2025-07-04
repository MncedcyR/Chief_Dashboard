import { NavLink } from "react-router-dom";
import {
  LayoutDashboardIcon,
  UsersIcon,
  CheckSquareIcon,
  CalendarIcon,
  FileTextIcon,
  ShieldIcon,
} from "lucide-react";
const Sidebar = () => {
  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboardIcon size={20} />,
      label: "Dashboard",
    },
    {
      to: "/employees",
      icon: <UsersIcon size={20} />,
      label: "Employees",
    },
    {
      to: "/tasks",
      icon: <CheckSquareIcon size={20} />,
      label: "Tasks",
    },
    {
      to: "/schedule",
      icon: <CalendarIcon size={20} />,
      label: "Schedule",
    },
    {
      to: "/reports",
      icon: <FileTextIcon size={20} />,
      label: "Reports",
    },
  ];
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col h-full">
      <div className="px-5 py-7 border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <ShieldIcon size={28} />
          <div>
            <h1 className="font-bold text-md">Eswatini Police Admin</h1>
            <p className="text-xs text-blue-200">Management Portal</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-5 py-20">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-700 text-white"
                      : "text-blue-100 hover:bg-blue-700"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-blue-700">
        <div className="px-4 py-2">
          <div className="font-medium">Chief Mncedcy R</div>
          <div className="text-xs text-blue-300">Senior Administrator</div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
