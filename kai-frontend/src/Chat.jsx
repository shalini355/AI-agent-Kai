import { useState, useRef, useEffect } from "react";

function Chat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial bot message
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Hi there! I’m Kai, your buddy. Ask me anything!", time: new Date() },
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage, time: new Date() }]);
    setInput("");
    setSending(true);
    setTyping(true);

    try {
     fetch(`${process.env.REACT_APP_API_URL}/ai-mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "Hmm, I didn’t quite get that. Can you tell me more?",
          time: new Date(),
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong. Try again.", time: new Date() },
      ]);
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  // Enter -> send, Shift+Enter -> newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format time
  const fmt = (d) =>
    new Date(d).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Styles
  const styles = {
    page: {
      height: "100vh",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      background: "linear-gradient(135deg, #0b1220 0%, #141a2b 100%)",
      color: "#e7ecf3",
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      background: "rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(6px)",
    },
    titleWrap: { display: "flex", alignItems: "center", gap: 10 },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 10,
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg, rgba(52,211,153,.9), rgba(59,130,246,.9))",
      color: "#0a1220",
      fontWeight: 900,
      fontSize: 16,
    },
    title: { fontSize: 16, fontWeight: 900, margin: 0, color: "#F6FAFF" },
    backBtn: {
      padding: "8px 12px",
      borderRadius: 10,
      background: "rgba(255,255,255,0.10)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "#fff",
      cursor: "pointer",
    },

    messages: {
      overflowY: "auto",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    row: { display: "flex", alignItems: "flex-end", gap: 8 },
    bubbleUser: {
      marginLeft: "auto",
      maxWidth: "70%",
      padding: "10px 12px",
      background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
      borderRadius: "14px 14px 4px 14px",
      boxShadow: "0 8px 18px rgba(0,0,0,.3)",
      color: "#fff",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      lineHeight: 1.45,
      fontSize: 15,
    },
    bubbleBot: {
      marginRight: "auto",
      maxWidth: "70%",
      padding: "10px 12px",
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "14px 14px 14px 4px",
      boxShadow: "0 8px 18px rgba(0,0,0,.25)",
      color: "#e7ecf3",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      lineHeight: 1.45,
      fontSize: 15,
    },
    time: { fontSize: 11, opacity: 0.75, marginTop: 4 },

    typing: {
      marginRight: "auto",
      padding: "8px 12px",
      background: "rgba(255,255,255,0.06)",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      fontSize: 13,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "#a5b4fc",
      animation: "blink 1.2s infinite ease-in-out",
    },

    inputBar: {
      padding: 12,
      background: "rgba(255,255,255,0.06)",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(6px)",
    },
    inputRow: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 8,
      alignItems: "center", // centered to align button and textarea
    },
    textarea: {
      width: "100%",
      minHeight: 48,          // explicit height
      maxHeight: 120,
      padding: "12px 14px",   // balanced padding
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      outline: "none",
      resize: "vertical",
      fontSize: 15,
      lineHeight: "22px",     // consistent baseline
      boxSizing: "border-box",
    },
    sendBtn: {
      height: 48,             // match textarea minHeight
      padding: "0 16px",      // fixed height by removing vertical padding
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      background: sending ? "rgba(52,211,153,.35)" : "#34d399",
      color: "#0a1220",
      transition: "transform .15s ease",
      pointerEvents: sending ? "none" : "auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },

    // keyframes
    styleTag: `
      @keyframes blink {
        0% { opacity: .2; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-2px); }
        100% { opacity: .2; transform: translateY(0); }
      }
    `,
  };

  return (
    <div style={styles.page}>
      <style>{styles.styleTag}</style>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.titleWrap}>
          <div style={styles.avatar}>K</div>
          <div>
            <h2 style={styles.title}>Chat with Kai</h2>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Wellness companion</div>
          </div>
        </div>
        <button style={styles.backBtn} onClick={onBack}>Back</button>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={styles.row}>
            <div style={msg.sender === "user" ? styles.bubbleUser : styles.bubbleBot}>
              <div>{msg.text}</div>
              {msg.time && <div style={styles.time}>{fmt(msg.time)}</div>}
            </div>
          </div>
        ))}

        {typing && (
          <div style={styles.typing}>
            <span>Kai is typing</span>
            <div style={{ display: "flex", gap: 4 }}>
              <span style={{ ...styles.dot, animationDelay: "0ms" }} />
              <span style={{ ...styles.dot, animationDelay: "120ms" }} />
              <span style={{ ...styles.dot, animationDelay: "240ms" }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={styles.inputBar}>
        <div style={styles.inputRow}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message...  (Enter to send • Shift+Enter for new line)"
            style={styles.textarea}
          />
          <button
            style={styles.sendBtn}
            onMouseOver={(e) => (e.currentTarget.style.transform = sending ? "none" : "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            onClick={sendMessage}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
