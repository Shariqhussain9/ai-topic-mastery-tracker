import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const [topics, setTopics] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API}/topics`, { headers });
      setTopics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateFeedback = async () => {
    try {
      setLoadingFeedback(true);
      const res = await axios.get(`${API}/ai/feedback`, { headers });
      setFeedback(res.data.feedback);
    } catch (err) {
      alert("Failed to generate feedback");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div style={styles.container}>
      
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>AI Topic Mastery Tracker</h2>
        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>

        {/* Topics Section */}
        <div style={styles.card}>
          <h3>📚 Study Topics</h3>

          {topics.length === 0 ? (
            <p>No topics available</p>
          ) : (
            <div style={styles.topicGrid}>
              {topics.map((t) => (
                <div key={t._id} style={styles.topicCard}>
                  <h4>{t.name}</h4>
                  <p style={styles.difficulty}>
                    {t.difficulty.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "13px", color: "#555" }}>
                    {t.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Feedback Section */}
        <div style={styles.card}>
          <h3>🤖 AI Study Plan</h3>

          <button style={styles.aiButton} onClick={generateFeedback}>
            {loadingFeedback ? "Generating..." : "Generate Study Plan"}
          </button>

          {feedback && (
            <div style={styles.feedbackBox}>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {feedback}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}


// =========================
// Modern Styles
// =========================

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6"
  },

  navbar: {
    background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#ffffff",
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer"
  },

  content: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  topicGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "15px"
  },

  topicCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb"
  },

  difficulty: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4f46e5"
  },

  aiButton: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  feedbackBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f3f4f6",
    borderRadius: "10px",
    maxHeight: "400px",
    overflowY: "auto"
  }
};