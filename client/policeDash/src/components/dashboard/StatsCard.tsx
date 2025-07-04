import React from "react";
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    positive: boolean;
  };
  color: string;
}
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-2 border-gray-300 shadow">
      <div className="flex justify-between items-start ">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {change && (
            <p
              className={`text-sm mt-2 ${
                change.positive ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.positive ? "+" : "-"}
              {Math.abs(change.value)}%
              <span className="text-gray-500 ml-1">from last month</span>
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );
};
export default StatsCard;
