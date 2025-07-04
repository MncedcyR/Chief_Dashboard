const EmployeeStats = () => {
  // Mock data for employee statistics
  const departments = [
    {
      name: "Patrol",
      count: 45,
      color: "bg-blue-500",
    },
    {
      name: "Investigation",
      count: 23,
      color: "bg-green-500",
    },
    {
      name: "Administration",
      count: 15,
      color: "bg-yellow-500",
    },
    {
      name: "Special Units",
      count: 12,
      color: "bg-purple-500",
    },
    {
      name: "Support Staff",
      count: 38,
      color: "bg-red-500",
    },
  ];
  const total = departments.reduce((acc, dept) => acc + dept.count, 0);
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Employee Distribution
        </h3>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="text-3xl font-bold text-gray-800 mr-3">{total}</div>
          <div className="text-gray-500">Total Employees</div>
        </div>
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.name} className="flex items-center">
              <div className="w-32 text-sm text-gray-600">{dept.name}</div>
              <div className="flex-1 ml-2">
                <div className="flex items-center">
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${dept.color}`}
                      style={{
                        width: `${(dept.count / total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-700">
                    {dept.count} ({Math.round((dept.count / total) * 100)}%)
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
export default EmployeeStats;
