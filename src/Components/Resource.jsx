import React, { useState } from "react";
import Event from "./Event";
import { format } from "date-fns";
import { getRandomColor, generateUniqueId } from "./constant.js";
import Modal from "./Modal";
import { MdDelete } from "react-icons/md";

const Resource = ({
  resource,
  days,
  setEvents,
  onResizeEvent,
  datesAreOnSameDay,
  events,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    id: "",
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    width: 80,
    color: getRandomColor(),
  });
  const [errorMessage, setErrorMessage] = useState("");
console.log(events)
  const handleCellDoubleClick = (day, event) => {
    setSelectedDay(day);
    setSelectedEvent(event);
    setEventDetails({
      id: generateUniqueId(),
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      width: 80,
      color: getRandomColor(),
    });
    if (event) {
      setEventDetails((prev) => ({
        ...prev,
        id: event.id,
        title: event.title,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        width: event.width,
        color: event.color,
      }));
    }
    setShowModal(true);
  };


  const handleAddEvent = () => {
    if (!eventDetails.title.trim() || !eventDetails.startTime || !eventDetails.endTime) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage("");

    const newEvent = {
      ...eventDetails,
      id: generateUniqueId(),
      day: format(selectedDay, "yyyy-MM-dd"),
      resource: resource,
    };

    setEvents(prevEvents => {
      if (prevEvents) {
        return [...prevEvents, newEvent];
      } else {
        console.error("Previous events array is null or undefined.");
        return [newEvent];
      }
    });
  
    setShowModal(false);
  };

  const handleUpdateEvent = () => {
    if (!eventDetails.title.trim() || !eventDetails.startTime || !eventDetails.endTime) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage("");

    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return {
          ...event,
          title: eventDetails.title,
          description: eventDetails.description,
          startTime: eventDetails.startTime,
          endTime: eventDetails.endTime,
          width: eventDetails.width,
          color: eventDetails.color,
        };
      }
      return event;
    });

    setEvents(updatedEvents);
    setShowModal(false);
  };

  const handleEventClick = (event) => {
    if (selectedEvent && selectedEvent.id === event.id) {
      setShowModal((prev) => !prev);
    } else {
      setSelectedEvent(event);
      handleCellDoubleClick(selectedDay, event);
    }
  };

  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter((ev) => ev.id !== eventId);
    setEvents(updatedEvents);
      // Check if there are no remaining events
  if (updatedEvents.length === 0) {
    // Clear events from local storage
    localStorage.removeItem("events");
  }
    setSelectedEvent(null);
    setShowModal(false);
  };

  const handleDragStart = (e, eventId) => {
    e.dataTransfer.setData("text/plain", eventId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetDay, targetResource) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          day: format(targetDay, "yyyy-MM-dd"),
          resource: targetResource,
          color: getRandomColor(),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="flex">
  {days.map((day, index) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    const dayEvents = events ? events.filter(
      (event) => event.day === formattedDay && event.resource === resource,
    ) : [];

    return (
      <div
        key={index}
        onDoubleClick={() => handleCellDoubleClick(day)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, day, resource)}
        className="flex w-20 border border-gray-300"
      >
        <span
          className={`nonDRAG ${
            datesAreOnSameDay(new Date(), new Date(day)) ? "active" : ""
          }`}
        ></span>
        <div>
          {dayEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              onResize={onResizeEvent}
              onClick={() => handleEventClick(event)}
              onDelete={() => handleEventDelete(event.id)}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, event.id)}
            />
          ))}
        </div>
        {dayEvents.length === 0 && (
          <div className="w-20 h-20 p-2 text-gray-400"></div>
        )}
      </div>
        );
      })}
      {showModal && selectedEvent && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Edit Event</h2>
            {errorMessage && (
              <div className="text-red-500 mb-2">{errorMessage}</div>
            )}
            <label className="block mb-2">
              Title<span className="text-red-500">*</span>:
              <input
                type="text"
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.title}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, title: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.description}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </label>
            <label className="block mb-2">
              Start Time<span className="text-red-500">*</span>:
              <input
                type="time"
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.startTime}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    startTime: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              End Time<span className="text-red-500">*</span>:
              <input
                type="time"
                className="ml-2 border border
                gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.endTime}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, endTime: e.target.value })
                }
              />
            </label>

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdateEvent}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white flex items-center gap-1 px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleEventDelete(selectedEvent.id)}
              >
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showModal && !selectedEvent && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Add Event</h2>
            {errorMessage && (
              <div className="text-red-500 mb-2">{errorMessage}</div>
            )}
            <label className="block mb-2">
              Title<span className="text-red-500">*</span>:
              <input
                type="text"
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.title}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, title: e.target.value })
                }
              />
            </label>
            <label className="block mb-2">
              Description:
              <textarea
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.description}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </label>
            <label className="block mb-2">
              Start Time<span className="text-red-500">*</span>:
              <input
                type="time"
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.startTime}
                onChange={(e) =>
                  setEventDetails({
                    ...eventDetails,
                    startTime: e.target.value,
                  })
                }
              />
            </label>
            <label className="block mb-2">
              End Time<span className="text-red-500">*</span>:
              <input
                type="time"
                className="ml-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-600"
                value={eventDetails.endTime}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, endTime: e.target.value })
                }
              />
            </label>

            <button
              className="bg-blue text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddEvent}
            >
              Add Event
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Resource;
