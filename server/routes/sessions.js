import express from "express";
import Session from "../models/Session.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Log study session
router.post("/", auth, async (req, res) => {
  const session = await Session.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(session);
});

// Get my sessions
router.get("/", auth, async (req, res) => {
  const sessions = await Session.find({ userId: req.user.id });
  res.json(sessions);
});

export default router;