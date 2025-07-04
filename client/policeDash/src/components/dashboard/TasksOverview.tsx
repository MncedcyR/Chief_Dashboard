const TasksOverview = () => {
  const tasks = [
    {
      id: 1,
      title: "Patrol Schedule Review",
      priority: "High",
      dueDate: "2023-05-15",
      status: "In Progress",
      assignee: "Officer Dlamini",
    },
    {
      id: 2,
      title: "Equipment Inventory",
      priority: "Medium",
      dueDate: "2023-05-18",
      status: "Pending",
      assignee: "Lt. Mamba",
    },
    {
      id: 3,
      title: "Training Evaluat ion",
      priority: "High",
      dueDate: "2023-05-12",
      status: "Completed",
      assignee: "Sgt. Mpanza",
    },
    {
      id: 4,
      title: "Community Outreach Plan",
      priority: "Low",
      dueDate: "2023-05-25",
      status: "Not Started",
      assignee: "Officer Nkuna",
    },
  ];
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
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Tasks Overview</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.assignee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all tasks
        </button>
      </div>
    </div>
  );
};
export default TasksOverview;
