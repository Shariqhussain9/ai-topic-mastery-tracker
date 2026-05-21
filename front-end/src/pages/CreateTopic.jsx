import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function CreateTopic() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    difficulty: "easy"
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      await axios.post(`${API}/topics`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Topic Created Successfully!");
      navigate("/topics");

    } catch (err) {
      alert("Failed to create topic");
    } finally {
      setLoading(false);
    }
  };

  // Optional: restrict access
  if (role !== "admin") {
    return (
      <div style={styles.center}>
        <h3>Access Denied</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>➕ Create New Topic</h2>

        <form onSubmit={submit} style={styles.form}>
          <input
            type="text"
            placeholder="Topic Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={styles.input}
          />

          <textarea
            placeholder="Topic Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            style={styles.textarea}
          />

          <select
            value={form.difficulty}
            onChange={(e) =>
              setForm({ ...form, difficulty: e.target.value })
            }
            style={styles.input}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button type="submit" style={styles.button}>
            {loading ? "Creating..." : "Create Topic"}
          </button>
        </form>
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
    maxWidth: "500px",
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
    gap: "18px"
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },

  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "100px",
    resize: "vertical",
    fontSize: "14px"
  },

  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};