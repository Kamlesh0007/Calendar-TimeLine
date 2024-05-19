import React from "react";

const Event = ({ event, onResize, onDragStart, onClick, draggable }) => {
  const handleDragStart = (e) => {
    // Set the data being dragged (event ID) and any other necessary data
    e.dataTransfer.setData("text/plain", event.id);
    e.dataTransfer.effectAllowed = "move";
    // Execute any additional logic required for drag start
    onDragStart();
  };

  // Format time to include AM or PM
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const formattedHour = parseInt(hour) > 12 ? parseInt(hour) - 12 : hour;
    const period = parseInt(hour) >= 12 ? "PM" : "AM";
    return `${formattedHour}:${minute} ${period}`;
  };

  return (
    <div
      draggable={draggable}
      onDragStart={handleDragStart}
      className="event text-white flex flex-col rounded-md items-center p-1"
      style={{ backgroundColor: event.color, width: event.width }}
      onClick={onClick}
    >
      <span className="w-[70%] truncate">{event.title}</span>
      <span className="text-xs mt-1">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </span>
      <div
        className="resize-handle"
        onMouseDown={(e) => onResize(event, e)}
      ></div>
    </div>
  );
};

export default Event;
