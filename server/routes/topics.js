import express from "express";
import Topic from "../models/Topic.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create topic (Admin only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Admin only" });

  const topic = await Topic.create(req.body);
  res.json(topic);
});

// Get all topics
router.get("/", auth, async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

export default router;