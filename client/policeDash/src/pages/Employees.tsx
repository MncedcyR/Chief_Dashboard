import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  badge: string;
  role: string;
  department: string;
  status: string;
}

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(
    null
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employees/");
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.badge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const employeeData = {
      name: formData.get("name"),
      badge: formData.get("badge"),
      role: formData.get("role"),
      department: formData.get("department"),
      status: formData.get("status"),
      email: formData.get("email"),
    };

    try {
      const response = await fetch(
        modalMode === "add"
          ? "http://127.0.0.1:8000/api/employees/add/"
          : `http://127.0.0.1:8000/api/employees/edit/${selectedEmployee?.id}/`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const result = await response.json();

      if (modalMode === "add") {
        setEmployees((prev) => [...prev, result]);
      } else if (modalMode === "edit") {
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === selectedEmployee?.id ? result : emp))
        );
      }

      toast.success(
        modalMode === "add"
          ? "Employee added successfully"
          : "Employee updated successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsModalOpen(false);
      setSelectedEmployee(null);
      setModalMode(null);
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage police department personnel
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => {
            setModalMode("add");
            setSelectedEmployee(null);
            setIsModalOpen(true);
          }}
        >
          <PlusIcon size={18} className="mr-1" />
          Add Employee
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees by name, badge, role or department..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Badge
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees?.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon size={20} className="text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {emp.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.badge}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        emp.status
                      )}`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {emp.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => {
                        setModalMode("edit");
                        setSelectedEmployee(emp);
                        setIsModalOpen(true);
                      }}
                    >
                      <EditIcon size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        setModalMode("delete");
                        setSelectedEmployee(emp);
                        setIsModalOpen(true);
                      }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {filteredEmployees.length} of {employees.length} employees
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
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative">
            <h1 className="text-blue-400 font-semibold ">
              ADD/UPDATE EMPLOYEE
            </h1>
            <button
              className="absolute top-4 right-2 py-0 text-red-500 hover:text-redy -700"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            {modalMode === "add" || modalMode === "edit" ? (
              <form onSubmit={handleSubmit} className="space-y-6 py-7">
                {/* Full Name */}
                <div className="relative mb-0 ">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full Name"
                    defaultValue={selectedEmployee?.name || ""}
                    className="w-full pr-10 py-3 px-4 text-sm rounded-md border placeholder-gray-400 font-semibold  border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 20v-1c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v1"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Badge Number */}

                <div className="relative mb-0 ">
                  <input
                    type="text"
                    name="badge"
                    required
                    placeholder="Badge Number"
                    defaultValue={selectedEmployee?.badge || ""}
                    className="w-full pr-10 py-3 px-4 text-sm rounded-md placeholder-gray-400 font-semibold border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        strokeWidth={2}
                      />
                      <path
                        d="M9 8h6M9 12h3"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Role Dropdown */}
                <div className="relative group flex items-center gap-2 w-full bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-gray-400  whitespace-nowrap ">
                    ROLE:
                  </span>

                  <select
                    name="role"
                    defaultValue={selectedEmployee?.role || ""}
                    required
                    className="appearance-none text-blue-400 bg-transparent ring-0 outline-none border border-gray-300 text-neutral-900 
                                    placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 w-full p-2.5 pr-10"
                  >
                    <option value="">Select Role</option>
                    <option value="Police Officer">Police Officer</option>
                    <option value="Sergeant">Sergeant</option>
                    <option value="Lieutenant">Lieutenant</option>
                    <option value="Detective">Detective</option>
                  </select>

                  <svg
                    y="0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    width="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    height="100"
                    className="w-7 h-7 absolute right-4 -rotate-45 stroke-blue-700 group-hover:rotate-0 transition-transform duration-300 pointer-events-none"
                  >
                    <path
                      strokeWidth="4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                      className="svg-stroke-primary"
                    />
                  </svg>
                </div>

                {/* Department Dropdown */}
                <div className="relative group flex items-center gap-2 w-full bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-gray-400  whitespace-nowrap ">
                    Department:
                  </span>

                  <select
                    name="department"
                    defaultValue={selectedEmployee?.department || ""}
                    required
                    className="appearance-none text-blue-400 bg-transparent ring-0 outline-none border border-gray-300 text-neutral-900 
                                    placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 w-full p-2.5 pr-10"
                  >
                    <option value="">Select Department</option>
                    <option value="Patrol">Patrol</option>
                    <option value="Investigation">Investigation</option>
                    <option value="Special Units">Special Units</option>
                  </select>

                  <svg
                    y="0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    width="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    height="100"
                    className="w-7 h-7 absolute right-4 -rotate-45 stroke-blue-700 group-hover:rotate-0 transition-transform duration-300 pointer-events-none"
                  >
                    <path
                      strokeWidth="4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                      className="svg-stroke-primary"
                    />
                  </svg>
                </div>
                {/* Status Dropdown */}
                <div className="relative group flex items-center gap-2 w-full bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-sm font-semibold text-gray-400  whitespace-nowrap ">
                    Status:
                  </span>

                  <select
                    name="status"
                    defaultValue={selectedEmployee?.status || ""}
                    required
                    className="appearance-none text-blue-400 bg-transparent ring-0 outline-none border border-gray-300 text-neutral-900 
                                    placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 w-full p-2.5 pr-10"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <svg
                    y="0"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    width="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    height="100"
                    className="w-7 h-7 absolute right-4 -rotate-45 stroke-blue-700 group-hover:rotate-0 transition-transform duration-300 pointer-events-none"
                  >
                    <path
                      strokeWidth="4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      fill="none"
                      d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                      className="svg-stroke-primary"
                    />
                  </svg>
                </div>
                {/* Email Address */}
                <div className="relative mb-0 ">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    defaultValue={selectedEmployee?.email || ""}
                    className="w-full pr-10 py-3 px-4 text-sm rounded-md border placeholder-gray-400 font-semibold  border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white text-sm font-medium rounded-md uppercase hover:bg-indigo-700 transition"
                  >
                    {modalMode === "add" ? "Add Employee" : "Update"}
                  </button>
                </div>
              </form>
            ) : (
              modalMode === "delete" &&
              selectedEmployee && (
                <div>
                  <h2 className="text-xl font-semibold text-red-600 mb-4">
                    Confirm Delete
                  </h2>
                  <p className="mb-6">
                    Are you sure you want to delete{" "}
                    <strong>{selectedEmployee.name}</strong>?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded"
                      onClick={async () => {
                        try {
                          await fetch(
                            `http://127.0.0.1:8000/api/employees/delete/${selectedEmployee.id}/`,
                            { method: "DELETE" }
                          );
                          setEmployees((prev) =>
                            prev.filter((emp) => emp.id !== selectedEmployee.id)
                          );
                          toast.success(
                            modalMode === "delete"
                              ? "Employee Deleted successfully"
                              : "Employee updated successfully"
                          );
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setIsModalOpen(false);
                          setSelectedEmployee(null);
                          setModalMode(null);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Employees;
