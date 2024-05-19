import React, { useState, useEffect } from "react";
import Header from "./Header";
import ResourcesColumn from "./ResourcesColumn";
import DaysColumns from "./DaysColumns";
import { DragDropContext } from "react-beautiful-dnd";
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  format,
  isSameDay,
} from "date-fns";
import Resource from "./Resource";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState(
    Array.from(
      { length: 8 },
      (_, index) => `Resource ${String.fromCharCode(65 + index)}`,
    ),
  );
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    setEvents(storedEvents);
    console.log(storedEvents, localStorage.getItem("events"));
  }, []);

  useEffect(() => {
    if (events && events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
    console.log(localStorage.getItem("events"));
  }, [events]);


  const datesAreOnSameDay = (first, second) => {
    return isSameDay(first, second);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const movedEvent = JSON.parse(source.droppableId);
    const updatedEvents = events.map((event) => {
      if (event.id === movedEvent.id) {
        return {
          ...event,
          day: destination.droppableId,
        };
      }
      return event;
    });

    setEvents(updatedEvents);
  };

  const onResizeEvent = (event, newWidth) => {
    setEvents(
      events.map((e) => (e.id === event.id ? { ...e, width: newWidth } : e)),
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() - 1)),
    );
  };

  const addResource = (resource) => {
    setResources((prevResources) => [...prevResources, resource]);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.setMonth(prevDate.getMonth() + 1)),
    );
  };
  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = startOfMonth(currentDate);
  const datesInMonth = [];
  for (let i = 0; i < daysInMonth; i++) {
    const date = addDays(firstDayOfMonth, i);
    datesInMonth.push(date);
  }

  return (
    <>
      <div className="calendar">
        <Header
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
          goToCurrentMonth={goToCurrentMonth}
        />
        <div className="flex ">
          <ResourcesColumn
            resources={resources}
            addResource={addResource}
            setResources={setResources}
            datesInMonth={datesInMonth}
          />
          <div className="flex-1 overflow-x-auto">
            <DaysColumns datesInMonth={datesInMonth} />
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="resource-grid">
                {resources.map((resource, index) => (
                  <Resource
                    key={index}
                    resource={resource}
                    days={datesInMonth}
                    datesAreOnSameDay={datesAreOnSameDay}
                    events={events}
                    onDropEvent={onDragEnd}
                    onResizeEvent={onResizeEvent}
                    setEvents={setEvents}
                  />
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
