import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      background: "#111827",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxSizing: "border-box",
      position: "fixed",
      left: 0,
      top: 0
    },
    title: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "22px",
      color: "#60a5fa",
      letterSpacing: "1px"
    },
    link: {
      textDecoration: "none",
      color: "#d1d5db",
      padding: "12px 15px",
      marginBottom: "10px",
      borderRadius: "6px",
      fontSize: "15px",
      transition: "0.3s ease",
      display: "block"
    },
    activeLink: {
      backgroundColor: "#2563eb",
      color: "white"
    },
    logoutBtn: {
      marginTop: "auto",
      background: "#7f1d1d",
      color: "white",
      padding: "12px 15px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? { ...styles.link, ...styles.activeLink }
      : styles.link;

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>AI Tracker</h2>

      <NavLink to="/dashboard" style={navStyle}>
        Dashboard
      </NavLink>

      <NavLink to="/topics" style={navStyle}>
        Topics
      </NavLink>

      {role === "admin" && (
        <NavLink to="/create-topic" style={navStyle}>
          Create Topic
        </NavLink>
      )}

      <NavLink to="/sessions" style={navStyle}>
        Study Sessions
      </NavLink>

      <NavLink to="/feedback" style={navStyle}>
        AI Feedback
      </NavLink>

      <button style={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}