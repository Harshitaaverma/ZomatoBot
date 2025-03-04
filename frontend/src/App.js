import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "👋 Welcome to ZomatoBot! Click below to get a delicious food recommendation. 🍽️", sender: "bot" },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/users/67a9024b178a1f20fe439722");
      if (!response.ok) throw new Error("Failed to fetch recommendation");

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.recommendation, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "❌ Oops! Something went wrong.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🍽️Smart Food Bot🤖</h1>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "bot" ? styles.botMessage : styles.userMessage}>
            {msg.text}
          </div>
        ))}
      </div>

      <button style={styles.button} onClick={fetchRecommendation} disabled={loading}>
        {loading ? "Fetching..." : "Get Recommendation"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff5f5",
    color: "#D62828",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  chatBox: {
    width: "400px",
    height: "300px",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #D62828",
    borderRadius: "10px",
    backgroundColor: "#fff",
    marginBottom: "20px",
  },
  botMessage: {
    backgroundColor: "#ffccd5",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#D62828",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
};

export default Chatbot;
