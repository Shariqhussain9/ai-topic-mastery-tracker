import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficulty: String,
  practiceQuestions: [String]
});

export default mongoose.model("Topic", topicSchema);