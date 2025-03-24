import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
    immutable: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  meetingDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  meetingRoom: {
    type: String,
    enum: ["Room1", "Room2", "Room3"],
    required: true,
  },
});

export default mongoose.model("Event", eventSchema);
