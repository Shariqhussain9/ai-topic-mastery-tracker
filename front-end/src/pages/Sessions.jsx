import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Sessions() {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    topicId: "",
    startTime: "",
    endTime: "",
    mood: 3,
    selfRating: 3
  });

  useEffect(() => {
    axios
      .get(`${API}/topics`, { headers })
      .then(res => setTopics(res.data))
      .catch(() => alert("Failed to load topics"));
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.topicId || !form.startTime || !form.endTime) {
      return alert("Please fill all required fields");
    }

    try {
      setLoading(true);

      await axios.post(`${API}/sessions`, form, { headers });

      alert("Session Logged Successfully!");

      // Reset form
      setForm({
        topicId: "",
        startTime: "",
        endTime: "",
        mood: 3,
        selfRating: 3
      });

    } catch (err) {
      alert("Failed to log session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📘 Log Study Session</h2>

        <form onSubmit={submit} style={styles.form}>

          <label style={styles.label}>Select Topic</label>
          <select
            value={form.topicId}
            onChange={e => setForm({ ...form, topicId: e.target.value })}
            style={styles.input}
          >
            <option value="">Select Topic</option>
            {topics.map(t => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <label style={styles.label}>Start Time</label>
          <input
            type="datetime-local"
            value={form.startTime}
            onChange={e => setForm({ ...form, startTime: e.target.value })}
            style={styles.input}
          />

          <label style={styles.label}>End Time</label>
          <input
            type="datetime-local"
            value={form.endTime}
            onChange={e => setForm({ ...form, endTime: e.target.value })}
            style={styles.input}
          />

          <label style={styles.label}>Mood (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={form.mood}
            onChange={e => setForm({ ...form, mood: Number(e.target.value) })}
            style={styles.input}
          />

          <label style={styles.label}>Self Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={form.selfRating}
            onChange={e =>
              setForm({ ...form, selfRating: Number(e.target.value) })
            }
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            {loading ? "Saving..." : "Save Session"}
          </button>

        </form>
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
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "600px",
    padding: "35px",
    borderRadius: "14px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
  },

  title: {
    marginBottom: "25px",
    textAlign: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  label: {
    fontSize: "14px",
    fontWeight: "bold"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};