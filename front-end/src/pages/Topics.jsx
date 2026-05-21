import { useEffect, useState } from "react";
import axios from "axios";
import TopicCard from "../components/TopicCard";

const API = "http://localhost:5000/api";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`${API}/topics`, { headers });
      setTopics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const generateQuestions = async (id) => {
    try {
      setLoadingId(id);

      await axios.post(
        `${API}/ai/generate-questions/${id}`,
        {},
        { headers }
      );

      await fetchTopics();
    } catch (err) {
      alert("Failed to generate questions");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 All Study Topics</h2>

      {topics.length === 0 && (
        <div style={styles.emptyBox}>
          No topics created yet.
        </div>
      )}

      <div style={styles.grid}>
        {topics.map((topic) => (
          <div key={topic._id} style={styles.cardWrapper}>
            
            <TopicCard topic={topic} />

            {role === "admin" && (
              <button
                style={styles.aiButton}
                onClick={() => generateQuestions(topic._id)}
                disabled={loadingId === topic._id}
              >
                {loadingId === topic._id
                  ? "Generating..."
                  : "Generate Practice Questions (AI)"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// =========================
// Modern Styles
// =========================

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f3f4f6"
  },

  title: {
    marginBottom: "30px"
  },

  emptyBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px"
  },

  cardWrapper: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  aiButton: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};