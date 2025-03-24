import React from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import moment from "moment";

const CreateEventModal = ({
  open,
  onClose,
  formData,
  formErrors,
  handleChange,
  handleCreateEvent,
  email,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{ p: 4, bgcolor: "white", margin: "auto", mt: "10%", width: 400 }}
      >
        <Typography variant="h6">Create New Event</Typography>
        <TextField
          label="Project Name"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={!!formErrors.projectName}
          helperText={formErrors.projectName}
        />
        <TextField
          label="Created By"
          value={email}
          disabled
          fullWidth
          margin="normal"
        />
        <TextField
          label="Created On"
          value={moment().format("DD/MM/YYYY")}
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
          required
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
          required
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
          required
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
          required
          error={!!formErrors.meetingRoom}
          helperText={formErrors.meetingRoom}
        >
          <MenuItem value="Room1">Room1</MenuItem>
          <MenuItem value="Room2">Room2</MenuItem>
          <MenuItem value="Room3">Room3</MenuItem>
        </TextField>
        {formErrors.general && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {formErrors.general}
          </Typography>
        )}
        <Button
          onClick={() => handleCreateEvent(onClose)}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateEventModal;
