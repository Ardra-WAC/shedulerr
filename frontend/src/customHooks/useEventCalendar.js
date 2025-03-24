import React, { useState } from "react";
import { useAtom } from "jotai";
import { roleValue } from "../components/Atom";
import moment from "moment";
import { toast } from "react-toastify";

function useEventCalendar(onSelectSlot) {
  const [role] = useAtom(roleValue);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const handleSelectSlot = ({ start }) => {
    const allowedRoles = ["Project Coordinator", "Team Lead"];
    if (allowedRoles.includes(role)) {
      const selectedMoment = moment(start);
      const today = moment().startOf("day");
      const oneYearFromNow = moment().add(1, "year").endOf("day");

      if (selectedMoment.day() === 0 || selectedMoment.day() === 6) {
        toast.error(
          "Events cannot be created on weekends (Saturday or Sunday)."
        );
        return;
      }

      if (
        selectedMoment.isBefore(today) ||
        selectedMoment.isAfter(oneYearFromNow)
      ) {
        toast.error(
          "Events can only be created from today up to one year in the future."
        );
        return;
      }

      onSelectSlot(start);
    }
  };

  const onNavigate = (newDate) => {
    setDate(newDate);
  };

  const onView = (newView) => {
    setView(newView);
  };

  const eventPropGetter = (event) => {
    let backgroundColor;
    switch (event.meetingRoom) {
      case "Room1":
        backgroundColor = "#0F91CC";
        break;
      case "Room2":
        backgroundColor = "#328D83";
        break;
      case "Room3":
        backgroundColor = "#F3AB4F";
        break;
      default:
        backgroundColor = "#cccccc";
    }
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "none",
      },
    };
  };
  return {
    handleSelectSlot,
    onNavigate,
    onView,
    eventPropGetter,
    date,
    view,
  };
}

export default useEventCalendar;
