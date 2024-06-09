import React from "react";

const CustomDatePicker = ({ selectedDate, onSelectDate }) => {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const formatDate = (date) => {
    const day = days[date.getDay()];
    const formattedDate = `${day} ${date.toLocaleDateString("es-AR")}`;
    return formattedDate;
  };

  return (
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => onSelectDate(e.target.value)}
      className="border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default CustomDatePicker;
