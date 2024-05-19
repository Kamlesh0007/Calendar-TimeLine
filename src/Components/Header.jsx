import React, { useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Header = ({
  currentDate,
  setCurrentDate,
  goToPrevMonth,
  goToNextMonth,
  goToCurrentMonth,
}) => {
  const months = [
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
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const datePickerRef = useRef(null);

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setCurrentDate(selectedDate);
  };

  const handleMonthYearClick = () => {
    datePickerRef.current.showPicker();
  };

  return (
    <div className="flex w-full justify-between p-2">
      <div
        className="text-3xl text-blue cursor-pointer"
        onClick={handleMonthYearClick}
      >
        {currentMonth} {currentYear}
        <input
          type="date"
          ref={datePickerRef}
          className="hidden ml-4"
          value={currentDate.toISOString().slice(0, 10)}
          onChange={handleDateChange}
        />
      </div>
      <div className="flex items-center gap-1 text-blue">
        <button onClick={goToPrevMonth}>
          <IoIosArrowBack className="text-blue text-2xl" />
        </button>
        <button onClick={goToCurrentMonth}>Today</button>
        <button onClick={goToNextMonth}>
          <IoIosArrowForward className="text-blue text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
