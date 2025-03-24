import React from "react";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { userEmail, roleValue } from "../components/Atom";
import useForm from "../customHooks/useForm";
import EventCalendar from "./EventCalendar";
import CreateEventModal from "./CreateEventModal";
import EventDetailsModal from "./EventDetailModal";

const MyCalendar = () => {
  const [email] = useAtom(userEmail);
  const [role] = useAtom(roleValue);

  const initialFormData = {
    projectName: "",
    meetingDate: "",
    startTime: "",
    endTime: "",
    meetingRoom: "",
  };

  const {
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
    events,
    setEvents,
    selectedEvent,
    loading,
  } = useForm(initialFormData, email, role);

  return (
    <>
      <EventCalendar
        events={events}
        onSelectSlot={(start) => handleSelectSlot(start)}
        onSelectEvent={handleSelectEvent}
        setEvents={setEvents}
      />
      <CreateEventModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleCreateEvent={() =>
          handleCreateEvent(() => {
            setOpenCreateModal(false);
            setFormData(initialFormData);
          })
        }
        email={email}
      />
      <EventDetailsModal
        open={openEventModal}
        onClose={() => setOpenEventModal(false)}
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleUpdateEvent={(closeModal) =>
          handleUpdateEvent(() => {
            setOpenEventModal(false);
            setFormData(initialFormData);
          })
        }
        handleDeleteEvent={(closeModal) =>
          handleDeleteEvent(() => {
            setOpenEventModal(false);
            setFormData(initialFormData);
          })
        }
        selectedEvent={selectedEvent}
        email={email}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MyCalendar;
