import React from "react";

const CustomTimePicker = ({ onSelectTime }) => {
  const timeSlots = ["08:30", "08:40", "08:50", "09:00", "09:10", "09:20", "09:30", "09:40", "09:50", "10:00", "10:10", "10:20", "10:30", "10:40", "10:50", "11:00", "11:10", "11:20", "11:30", "11:40", "11:50", "12:00", "12:10", "12:20"];

  return (
    <div className="grid grid-cols-4 gap-2">
      {timeSlots.map((timeSlot) => (
        <button
          key={timeSlot}
          onClick={() => onSelectTime(timeSlot)}
          className="bg-gray-200 hover:bg-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          {timeSlot}
        </button>
      ))}
    </div>
  );
};

export default CustomTimePicker;
