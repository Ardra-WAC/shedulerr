import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Legend from "./Legend";
import useEventCalendar from "../customHooks/useEventCalendar";

const localizer = momentLocalizer(moment);

const EventCalendar = ({ events, onSelectSlot, onSelectEvent }) => {
  const { handleSelectSlot, onNavigate, onView, eventPropGetter, date, view } =
    useEventCalendar(onSelectSlot);

  return (
    <div style={{ padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "0 auto", maxWidth: "1200px" }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={onSelectEvent}
        date={date}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
        views={["month", "week", "day", "agenda"]}
        eventPropGetter={eventPropGetter}
        popup
      />
      <Legend />
    </div>
  );
};

export default EventCalendar;
