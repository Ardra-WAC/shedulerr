import { useState } from "react";
import moment from "moment";
import axios from "axios";
import useEvents from "./useEvents";

const useForm = (initialData, email, role) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState({
    projectName: "",
    meetingDate: "",
    startTime: "",
    endTime: "",
    meetingRoom: "",
  });

  const { events, setEvents, fetchEvents, loading } = useEvents();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const errors = {
      projectName: "",
      meetingDate: "",
      startTime: "",
      endTime: "",
      meetingRoom: "",
    };
    const { projectName, meetingDate, startTime, endTime, meetingRoom } =
      formData;

    if (!projectName) errors.projectName = "Project name is required.";
    if (!meetingDate) errors.meetingDate = "Meeting date is required.";
    if (!startTime) errors.startTime = "Start time is required.";
    if (!endTime) errors.endTime = "End time is required.";
    if (!meetingRoom) errors.meetingRoom = "Meeting room is required.";

    if (
      !projectName ||
      !meetingDate ||
      !startTime ||
      !endTime ||
      !meetingRoom
    ) {
      setFormErrors(errors);
      return false;
    }

    const start = moment(`${meetingDate} ${startTime}`, "YYYY-MM-DD HH:mm");
    const end = moment(`${meetingDate} ${endTime}`, "YYYY-MM-DD HH:mm");
    if (end.isSameOrBefore(start)) {
      errors.endTime = "End time must be after start time.";
      setFormErrors(errors);
      return false;
    }

    const today = moment().startOf("day");
    if (moment(meetingDate).isBefore(today)) {
      errors.meetingDate = "Meeting date cannot be in the past.";
      setFormErrors(errors);
      return false;
    }

    if (moment(meetingDate).isSame(today, "day")) {
      const nowPlus15 = moment().add(15, "minutes");
      if (start.isBefore(nowPlus15)) {
        errors.startTime =
          "Start time must be at least 15 minutes from now for today.";
        setFormErrors(errors);
        return false;
      }
    }

    const newEventStart = start;
    const newEventEnd = end;
    const isConflict = events.some((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      const sameRoom = event.meetingRoom === meetingRoom;
      const timeOverlap =
        newEventStart.isBefore(eventEnd) && newEventEnd.isAfter(eventStart);
      return (
        sameRoom && timeOverlap && event.id !== (selectedEvent?.id || null)
      );
    });

    if (isConflict) {
      errors.general = `The room ${meetingRoom} is already booked for this time slot.`;
      setFormErrors(errors);
      return false;
    }

    setFormErrors(errors);
    return true;
  };

  const handleSelectSlot = (start, setView, setDate) => {
    const allowedRoles = ["Project Coordinator", "Team Lead"];
    if (!allowedRoles.includes(role)) {
      setView("day");
      setDate(start);
      return;
    }

    setSelectedSlot(start);
    setFormData({
      ...initialData,
      meetingDate: moment(start).format("YYYY-MM-DD"),
      startTime: moment(start).format("HH:mm"),
    });
    setOpenCreateModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      projectName: event.projectName,
      meetingDate: moment(event.meetingDate).format("YYYY-MM-DD"),
      startTime: event.startTime,
      endTime: event.endTime,
      meetingRoom: event.meetingRoom,
    });
    setOpenEventModal(true);
  };

  const handleCreateEvent = async (closeModal) => {
    if (!validateForm()) return;

    try {
      const newEvent = { ...formData, createdBy: email };
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/events`,
        newEvent,
        {
          headers: { "user-email": email, "role-value": role },
        }
      );
      const dateOnly = moment(response.data.meetingDate).format("YYYY-MM-DD");
      const createdEvent = {
        id: response.data._id,
        title: response.data.projectName,
        start: new Date(`${dateOnly}T${response.data.startTime}`),
        end: new Date(`${dateOnly}T${response.data.endTime}`),
        meetingRoom: response.data.meetingRoom,
        ...response.data,
      };
      setEvents((prevEvents) => [...prevEvents, createdEvent]);
      closeModal();
      fetchEvents();
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
    }
  };

  const handleUpdateEvent = async (closeModal) => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/events/${selectedEvent.id}`,
        formData,
        { headers: { "user-email": email, "role-value": role } }
      );
      const dateOnly = moment(response.data.meetingDate).format("YYYY-MM-DD");
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: response.data.projectName,
                start: new Date(`${dateOnly}T${response.data.startTime}`),
                end: new Date(`${dateOnly}T${response.data.endTime}`),
                meetingRoom: response.data.meetingRoom,
                ...response.data,
              }
            : event
        )
      );
      closeModal();
    } catch (error) {
      console.error(
        "Error updating event:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteEvent = async (closeModal) => {
    try {
      await axios.delete(
       `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/events/${selectedEvent.id}`,
        {
          headers: { "user-email": email, "role-value": role },
        }
      );
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEvent.id)
      );
      closeModal();
    } catch (error) {
      console.error(
        "Error deleting event:",
        error.response?.data || error.message
      );
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    handleChange,
    handleCreateEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleSelectSlot,
    handleSelectEvent,
    openCreateModal,
    setOpenCreateModal,
    openEventModal,
    setOpenEventModal,
    selectedSlot,
    selectedEvent,
    events,
    setEvents,
    loading,
  };
};

export default useForm;
