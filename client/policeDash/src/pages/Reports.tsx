import { useState, useEffect } from "react";
import AddReportModal from "../components/AddReportModal";
import ViewReportModal from "../components/ViewReportModal";
import type { Report } from "../types";

import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";
const Reports = () => {
  type Report = {
    id: number;
    title: string;
    description: string;
    type: string;
    author: string;
    date: string;
    status: string;
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Mock report data
  // const reports = [
  //   {
  //     id: 1,
  //     title: "Monthly Patrol Report",
  //     author: "Sgt. Gule",
  //     date: "2023-05-10",
  //     type: "Monthly",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2,
  //     title: "Downtown Area Incident Summary",
  //     author: "Officer Mamba",
  //     date: "2023-05-08",
  //     type: "Incident",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     title: "Equipment Maintenance Status",
  //     author: "Lt. Zulu",
  //     date: "2023-05-05",
  //     type: "Maintenance",
  //     status: "Approved",
  //   },
  //   {
  //     id: 4,
  //     title: "Community Engagement Results",
  //     author: "Officer Davis",
  //     date: "2023-05-01",
  //     type: "Community",
  //     status: "Approved",
  //   },
  //   {
  //     id: 5,
  //     title: "Special Event Security Plan",
  //     author: "Officer Dlamini",
  //     date: "2023-04-28",
  //     type: "Planning",
  //     status: "Pending",
  //   },
  //   {
  //     id: 6,
  //     title: "Quarterly Budget Analysis",
  //     author: "Chief Masango",
  //     date: "2023-04-15",
  //     type: "Financial",
  //     status: "Approved",
  //   },
  //   {
  //     id: 7,
  //     title: "Training Program Effectiveness",
  //     author: "Sgt. Sthole",
  //     date: "2023-04-10",
  //     type: "Training",
  //     status: "Rejected",
  //   },
  //   {
  //     id: 8,
  //     title: "Vehicle Fleet Status Report",
  //     author: "Officer Mhlanga",
  //     date: "2023-04-05",
  //     type: "Maintenance",
  //     status: "Approved",
  //   },
  // ];

  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/reports/");
      const data = await response.json();
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || report.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getTypeColor = (type: string) => {
    const colors: {
      [key: string]: string;
    } = {
      Monthly: "bg-blue-100 text-blue-800",
      Incident: "bg-red-100 text-red-800",
      Maintenance: "bg-yellow-100 text-yellow-800",
      Community: "bg-green-100 text-green-800",
      Planning: "bg-purple-100 text-purple-800",
      Financial: "bg-indigo-100 text-indigo-800",
      Training: "bg-pink-100 text-pink-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsViewOpen(true);
  };

  const closeViewModal = () => {
    setSelectedReport(null);
    setIsViewOpen(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create, review, and manage department reports
          </p>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
        >
          <PlusIcon size={18} className="mr-1" />
          New Report
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <FilterIcon size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-md mr-3">
                        <FileTextIcon size={18} className="text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {report.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                        report.type
                      )}`}
                    >
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewReport(report)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </button>
                    {isViewOpen && selectedReport && (
                      <ViewReportModal
                        report={selectedReport}
                        onClose={closeViewModal}
                      />
                    )}

                    <button className="text-blue-600 hover:text-blue-900">
                      <DownloadIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredReports.length === 0 && (
          <div className="py-12 text-center">
            <FileTextIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              No reports found
            </h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredReports.length} of {reports.length} reports
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddReportModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};
export default Reports;
