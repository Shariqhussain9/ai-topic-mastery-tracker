import React, { useState, useRef, useEffect } from "react";

export default function TopicCard({ topic }) {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (expanded) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [expanded]);

  const styles = {
    card: {
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      marginBottom: "20px",
      border: "1px solid #eee",
      transition: "0.3s ease"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px"
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827"
    },
    difficulty: (level) => ({
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      color: "#fff",
      background:
        level === "easy"
          ? "#16a34a"
          : level === "medium"
          ? "#f59e0b"
          : "#dc2626"
    }),
    description: {
      color: "#4b5563",
      marginBottom: "12px",
      fontSize: "14px"
    },
    toggleButton: {
      marginTop: "10px",
      padding: "6px 12px",
      borderRadius: "6px",
      border: "none",
      background: "#2563eb",
      color: "white",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "500"
    },
    questionWrapper: {
      overflow: "hidden",
      transition: "height 0.4s ease",
      height: height
    },
    questionBox: {
      marginTop: "10px",
      padding: "10px",
      background: "#f9fafb",
      borderRadius: "8px"
    },
    questionTitle: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#1f2937"
    },
    list: {
      paddingLeft: "18px",
      color: "#374151",
      fontSize: "14px"
    },
    listItem: {
      marginBottom: "6px"
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.title}>{topic.name}</div>
        <div style={styles.difficulty(topic.difficulty)}>
          {topic.difficulty.toUpperCase()}
        </div>
      </div>

      <div style={styles.description}>
        {topic.description}
      </div>

      {topic.practiceQuestions?.length > 0 && (
        <>
          <button
            style={styles.toggleButton}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide Practice Questions" : "Show Practice Questions"}
          </button>

          <div style={styles.questionWrapper}>
            <div ref={contentRef} style={styles.questionBox}>
              <div style={styles.questionTitle}>
                Practice Questions
              </div>
              <ul style={styles.list}>
                {topic.practiceQuestions.map((q, i) => (
                  <li key={i} style={styles.listItem}>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}