# 🤖 AI-Powered Topic Mastery Tracker

A full-stack learning analytics system where students log study sessions and receive AI-powered personalized feedback.

Built with:

- Node.js
- Express
- MongoDB
- React (Vite)
- Google Gemini API (LLM Integration)

---

## 🚀 Features

### 👨‍🏫 Admin
- Create study topics
- Add difficulty (easy / medium / hard)
- Auto-generate 3 AI practice questions per topic

### 👨‍🎓 Student
- Log study sessions
  - Start time
  - End time
  - Mood (1–5)
  - Self-rating (1–5)
- View topics
- Generate AI study feedback

### 🧠 AI Features (Gemini API)
- Identifies weak areas
- Suggests next topic
- Generates 7-day study plan
- Auto-generates 3 practice questions per topic

---

# 🏗 Tech Stack

## Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Google Gemini API

## Frontend
- React (Vite)
- React Router
- Axios
- Inline styling + CSS layout

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd ai-topic-mastery-tracker
```

# 2️⃣ Backend Setup
```bash
cd backend
npm install
```

# Create .env file
```properties
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

# 3️⃣ Start Backend
```bash
npm start
```
Backend runs on:
```
http://localhost:5000
```

# 4️⃣ Frontend Setup
```bash
cd ../front-end
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---
### 🧪 How to Test

1. **Register as Admin**
   - Create topics
2. **Generate Practice Questions**
   - Click "Generate Practice Questions"
3. **Register as Student**
   - Log study sessions  
   - Generate AI feedback