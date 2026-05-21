import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const generate = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/ai/feedback`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFeedback(res.data.feedback);

    } catch (err) {
      alert("Failed to generate AI feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.card}>
        <h2 style={styles.title}>🤖 AI Study Feedback</h2>

        <button style={styles.button} onClick={generate}>
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>

        {feedback && (
          <div style={styles.feedbackBox}>
            <pre style={styles.pre}>
              {feedback}
            </pre>
          </div>
        )}
      </div>

    </div>
  );
}


// ========================
// Modern Styles
// ========================

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "900px",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "20px"
  },

  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  feedbackBox: {
    marginTop: "25px",
    background: "#f9fafb",
    padding: "20px",
    borderRadius: "10px",
    maxHeight: "450px",
    overflowY: "auto",
    border: "1px solid #e5e7eb"
  },

  pre: {
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
    fontSize: "14px",
    lineHeight: "1.6"
  }
};