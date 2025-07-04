import { useState, useEffect } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import {
  PlusIcon,
  FilterIcon,
  SortAscIcon,
  CheckSquareIcon,
  ClockIcon,
} from "lucide-react";
const Tasks = () => {
  type Task = {
    id: number;
    title: string;
    description: string;
    priority: string;
    due_date: string;
    status: string;
    assignee: string;
  };

  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks/");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter(
          (task) => task.status.toLowerCase() === filter.toLowerCase()
        );
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Management</h1>
          <p className="text-gray-600 mt-1">
            Assign and track department tasks
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon size={18} className="mr-1" />
          Create Task
        </button>
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "all"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter("in progress")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "in progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "pending"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === "completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Completed
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <FilterIcon size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">
              <SortAscIcon size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {task.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority} Priority
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <ClockIcon size={14} className="mr-1" /> Due:{" "}
                      {task.due_date}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex flex-col items-end">
                  <div className="text-sm font-medium text-gray-700">
                    {task.assignee}
                  </div>
                  <div className="mt-2">
                    {task.status !== "Completed" ? (
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200">
                        <CheckSquareIcon size={14} className="inline mr-1" />{" "}
                        Mark Complete
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                        <CheckSquareIcon size={14} className="inline mr-1" />{" "}
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tasks;
