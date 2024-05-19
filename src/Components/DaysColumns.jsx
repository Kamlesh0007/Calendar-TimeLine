import React from "react";
import { format, isToday, startOfWeek, addDays } from "date-fns";

const DaysColumns = ({ firstDayOfMonth, datesInMonth }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="">
      <div className={`flex`}>
        {/* Render days */}
        {datesInMonth.map((date, index) => {
          const dayName = weekDays[date.getDay()];
          const isFirstDayOfWeek = index % 7 === 0; // Check if it's the first day of the week
          const isFirstDayOfMonth = index === 0 || date.getDate() === 1; // Check if it's the first day of the month

          return (
            <div
              key={index}
              className={`flex items-center justify-start ${isToday(date) ? "bg-blue  text-white rounded-md " : ""}`}
            >
              <th
                key={index}
                className={`flex w-20 gap-2 items-center border border-gray-300 p-2 ${isFirstDayOfMonth || isFirstDayOfWeek ? "border-l" : ""}`}
              >
                <span>{format(date, "d")}</span>
                <span className="text-xs font-bold">{dayName}</span>
              </th>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaysColumns;
