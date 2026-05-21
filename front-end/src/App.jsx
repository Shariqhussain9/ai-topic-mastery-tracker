import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import CreateTopic from "./pages/CreateTopic";
import Sessions from "./pages/Sessions";
import Feedback from "./pages/Feedback";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      {!token ? (
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard setToken={setToken} />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/create-topic" element={<CreateTopic />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}