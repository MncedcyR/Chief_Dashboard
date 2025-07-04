import { FileTextIcon, ChevronRightIcon } from "lucide-react";
const RecentReports = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Patrol Report",
      author: "Sgt. Sthole",
      date: "2023-05-10",
      type: "Monthly",
    },
    {
      id: 2,
      title: "Downtown Area Incident Summary",
      author: "Officer Masango",
      date: "2023-05-08",
      type: "Incident",
    },
    {
      id: 3,
      title: "Equipment Maintenance Status",
      author: "Lt. Kunene",
      date: "2023-05-05",
      type: "Maintenance",
    },
    {
      id: 4,
      title: "Community Engagement Results",
      author: "Officer Dlamini",
      date: "2023-05-01",
      type: "Community",
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Reports</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {reports.map((report) => (
          <div
            key={report.id}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-md mr-4">
                <FileTextIcon size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {report.title}
                </h4>
                <div className="mt-1 flex items-center text-xs text-gray-500 space-x-2">
                  <span>{report.author}</span>
                  <span>•</span>
                  <span>{report.date}</span>
                  <span>•</span>
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded">
                    {report.type}
                  </span>
                </div>
              </div>
              <ChevronRightIcon size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          <a href="/reports"></a>View all reports
        </button>
      </div>
    </div>
  );
};
export default RecentReports;
