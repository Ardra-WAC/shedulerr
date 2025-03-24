import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/events`);
      const formattedEvents = response.data.map((event) => {
        const dateOnly = moment(event.meetingDate).format("YYYY-MM-DD");
        return {
          id: event._id,
          title: event.projectName,
          start: new Date(`${dateOnly}T${event.startTime}`),
          end: new Date(`${dateOnly}T${event.endTime}`),
          meetingRoom: event.meetingRoom,
          ...event,
        };
      });
      setEvents(formattedEvents);
      setLoading(false);
    } catch (error) {
      console.error(
        "Error fetching events:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, setEvents, fetchEvents, loading };
};

export default useEvents;
