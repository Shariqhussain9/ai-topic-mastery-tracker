import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  topicId: mongoose.Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  mood: Number,
  selfRating: Number
});

export default mongoose.model("Session", sessionSchema);