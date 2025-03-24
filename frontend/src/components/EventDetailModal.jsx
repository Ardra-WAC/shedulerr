import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import moment from "moment";

const EventDetailsModal = ({
  open,
  onClose,
  formData,
  formErrors,
  handleChange,
  handleUpdateEvent,
  handleDeleteEvent,
  selectedEvent,
  email,
}) => {
  const isEditable = selectedEvent?.createdBy === email;
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ p: 4, bgcolor: "white", margin: "auto", mt: "10%", width: 400 }}
      >
        <Typography variant="h6">Event Details</Typography>
        <TextField
          label="Project Name"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!isEditable}
          error={!!formErrors.projectName}
          helperText={formErrors.projectName}
        />
        <TextField
          label="Created By"
          value={selectedEvent?.createdBy || ""}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Created On"
          value={moment(selectedEvent?.createdOn).format("DD-MM-YYYY")}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Meeting Date"
          type="date"
          name="meetingDate"
          value={formData.meetingDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!isEditable}
          error={!!formErrors.meetingDate}
          helperText={formErrors.meetingDate}
        />
        <TextField
          label="Start Time"
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!isEditable}
          error={!!formErrors.startTime}
          helperText={formErrors.startTime}
        />
        <TextField
          label="End Time"
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!isEditable}
          error={!!formErrors.endTime}
          helperText={formErrors.endTime}
        />
        <TextField
          select
          label="Meeting Room"
          name="meetingRoom"
          value={formData.meetingRoom}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!isEditable}
          error={!!formErrors.meetingRoom}
          helperText={formErrors.meetingRoom}
        >
          <MenuItem value="Room1">Room1</MenuItem>
          <MenuItem value="Room2">Room2</MenuItem>
          <MenuItem value="Room3">Room3</MenuItem>
        </TextField>
        {formErrors.general && isEditable && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {formErrors.general}
          </Typography>
        )}
        {isEditable && (
          <>
            <Button
              onClick={() => handleUpdateEvent(onClose)}
              variant="contained"
              sx={{ mt: 2, mr: 2 }}
            >
              Update
            </Button>
            <Button
              onClick={() => handleDeleteEvent(onClose)}
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
            >
              Delete
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EventDetailsModal;
