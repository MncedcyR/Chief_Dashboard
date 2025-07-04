import { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";
const Schedule = () => {
  const [currentDate] = useState(new Date());
  // Generate days for the current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = Array.from(
    {
      length: daysInMonth,
    },
    (_, i) => i + 1
  );
  const blanks = Array.from(
    {
      length: firstDayOfMonth,
    },
    (_, i) => i
  );
  // Mock shift data
  const shifts = [
    {
      id: 1,
      date: 10,
      title: "Morning Patrol",
      time: "06:00 - 14:00",
      officers: ["Officer Khumalo", "Officer Mhlanga", "Officer Masango"],
    },
    {
      id: 2,
      date: 10,
      title: "Evening Patrol",
      time: "14:00 - 22:00",
      officers: ["Officer Dlamini", "Officer Bhembe", "Officer Gama"],
    },
    {
      id: 3,
      date: 10,
      title: "Night Patrol",
      time: "22:00 - 06:00",
      officers: ["Officer Khumalo", "Officer Mhlanga", "Officer Masango"],
    },
    {
      id: 4,
      date: 12,
      title: "Special Event",
      time: "10:00 - 18:00",
      officers: [
        "Officer Dlamini",
        "Officer Motsa",
        "Officer Mavuso",
        "Officer Bhembe",
      ],
    },
    {
      id: 5,
      date: 15,
      title: "Training Day",
      time: "09:00 - 17:00",
      officers: [
        "Officer Masango",
        "Officer Khumalo",
        "Officer Gama",
        "Officer Masango",
      ],
    },
    {
      id: 6,
      date: 18,
      title: "Community Outreach",
      time: "11:00 - 15:00",
      officers: ["Officer Dlamini", "Officer Bhembe", "Officer Gama"],
    },
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getShiftsForDay = (day: number) => {
    return shifts.filter((shift) => shift.date === day);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shift Schedule</h1>
          <p className="text-gray-600 mt-1">
            Manage department shifts and assignments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700">
          <CalendarIcon size={18} className="mr-1" />
          Add Shift
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeftIcon size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRightIcon size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
              Month
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
              Week
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
              Day
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {blanks.map((blank) => (
              <div
                key={`blank-${blank}`}
                className="h-22 border border-gray-200 rounded-md bg-gray-50"
              ></div>
            ))}
            {days.map((day) => {
              const dayShifts = getShiftsForDay(day);
              const isToday = day === currentDate.getDate();
              return (
                <div
                  key={day}
                  className={`h-22 border border-gray-200 rounded-md overflow-hidden ${
                    isToday ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div
                    className={`p-2 ${
                      isToday
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {day}
                  </div>
                  <div className="p-1 space-y-1 overflow-y-auto h-24">
                    {dayShifts.map((shift) => (
                      <div
                        key={shift.id}
                        className="p-1 bg-blue-50 border border-blue-100 rounded text-xs"
                      >
                        <div className="font-medium text-blue-800">
                          {shift.title}
                        </div>
                        <div className="text-blue-600 flex items-center mt-1">
                          <ClockIcon size={10} className="mr-1" /> {shift.time}
                        </div>
                        <div className="text-blue-600 flex items-center mt-1">
                          <UsersIcon size={10} className="mr-1" />{" "}
                          {shift.officers.length} officers
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Upcoming Shifts
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {shifts.slice(0, 4).map((shift) => (
              <div key={shift.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{shift.title}</h4>
                    <div className="mt-1 text-sm text-gray-600 flex items-center">
                      <CalendarIcon size={14} className="mr-1" />
                      May {shift.date}, 2023 •{" "}
                      <ClockIcon size={14} className="mx-1" /> {shift.time}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {shift.officers.length} officers assigned
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Officer Availability
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  Officer Mamba
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600">Available</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  Officer Dlamini
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600">Available</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  Officer Khumalo
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600">On Shift</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  Officer Gwebu
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600">On Leave</div>
              </div>
              <div className="flex items-center">
                <div className="w-32 text-sm font-medium text-gray-700">
                  Officer Kunene
                </div>
                <div className="flex-1 ml-2">
                  <div className="h-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="ml-2 text-sm text-gray-600">On Shift</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
