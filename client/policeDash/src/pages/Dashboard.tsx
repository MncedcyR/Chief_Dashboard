import StatsCard from "../components/dashboard/StatsCard";
import TasksOverview from "../components/dashboard/TasksOverview";
import RecentReports from "../components/dashboard/RecentReports";
import EmployeeStats from "../components/dashboard/EmployeeStats";
import {
  UsersIcon,
  CheckSquareIcon,
  ClipboardListIcon,
  CalendarIcon,
} from "lucide-react";
const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Chief Mncedcy R</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value="133"
          icon={<UsersIcon size={24} className="text-white" />}
          change={{
            value: 2.5,
            positive: true,
          }}
          color="bg-blue-500"
        />
        <StatsCard
          title="Active Tasks"
          value="28"
          icon={<CheckSquareIcon size={24} className="text-white" />}
          change={{
            value: 12,
            positive: true,
          }}
          color="bg-green-500"
        />
        <StatsCard
          title="Pending Reports"
          value="17"
          icon={<ClipboardListIcon size={24} className="text-white" />}
          change={{
            value: 5,
            positive: false,
          }}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Shifts Today"
          value="24"
          icon={<CalendarIcon size={24} className="text-white" />}
          color="bg-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TasksOverview />
        </div>
        <div>
          <EmployeeStats />
        </div>
      </div>
      <div>
        <RecentReports />
      </div>
    </div>
  );
};
export default Dashboard;
