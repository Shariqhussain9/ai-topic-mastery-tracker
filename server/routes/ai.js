import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import auth from "../middleware/auth.js";
import Topic from "../models/Topic.js";
import Session from "../models/Session.js";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "AIzaSyBLomejotLzKZWp_2yXA2KcvpVy-vK9oJc");


// =============================
// 1️⃣ AI FEEDBACK ROUTE
// =============================
router.get("/feedback", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    const topics = await Topic.find();

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });

    const prompt = `
You are an expert learning coach AI.

Here is study data:
Sessions: ${JSON.stringify(sessions)}
Topics: ${JSON.stringify(topics)}

Tasks:
1. Identify weak areas (low ratings or low time spent)
2. Suggest next topic
3. Create 7-day study schedule (clear daily plan)

Respond in structured markdown.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ feedback: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI feedback generation failed" });
  }
});


// =============================
// 2️⃣ GENERATE PRACTICE QUESTIONS
// =============================
router.post("/generate-questions/:topicId", auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.topicId);

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });

    const prompt = `
Generate exactly 3 practice questions for this topic.

Topic Name: ${topic.name}
Description: ${topic.description}

Make questions progressively harder.
Return only numbered questions.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    topic.practiceQuestions = text
      .split("\n")
      .filter(line => line.trim() !== "");

    await topic.save();

    res.json(topic);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Question generation failed" });
  }
});

export default router;