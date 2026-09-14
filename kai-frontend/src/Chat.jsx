import { useState, useRef, useEffect } from "react";

const quickReplies = [
  "Thoda stressed hoon aaj...",
  "Feeling energetic!",
  "Mujhe thoda overwhelmed lag raha hai",
  "Main calm aur grounded feel kar raha hoon",
];

const sentimentColors = {
  happy: { glow: "#fbbf24", badge: "rgba(251,191,36,0.18)", border: "rgba(251,191,36,0.38)" },
  calm: { glow: "#5eead4", badge: "rgba(94,234,212,0.17)", border: "rgba(94,234,212,0.38)" },
  anxious: { glow: "#fda4af", badge: "rgba(253,164,175,0.18)", border: "rgba(253,164,175,0.38)" },
  sad: { glow: "#93c5fd", badge: "rgba(147,197,253,0.17)", border: "rgba(147,197,253,0.38)" },
  neutral: { glow: "#a5b4fc", badge: "rgba(165,180,252,0.18)", border: "rgba(165,180,252,0.38)" },
};

function Chat({ onBack, onSentimentChange }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState("calm");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: "Hi, I’m Kai — your empathetic wellness companion. Tell me how you’re feeling today.",
        time: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const persistMoodHistory = (sentiment) => {
    if (typeof window === "undefined") return;

    const entry = {
      mood: sentiment.mood || "neutral",
      score: Math.min(10, Math.max(1, Number(sentiment.score || 5))),
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem("kai_mood_history") || "[]");
      const next = [...existing, entry].slice(-30);
      localStorage.setItem("kai_mood_history", JSON.stringify(next));
    } catch (error) {
      console.error("Unable to save mood history", error);
    }
  };

  const normalizeSentiment = (data) => {
    const mood = data?.sentiment?.mood || data?.mood || "neutral";
    const score = Math.min(10, Math.max(1, Number(data?.sentiment?.score || data?.score || 5)));

    return { mood, score };
  };

  const sendMessage = async (messageOverride) => {
    const userMessage = (messageOverride || input).trim();

    if (!userMessage || sending) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage, time: new Date() },
    ]);
    setInput("");
    setSending(true);
    setTyping(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const sentiment = normalizeSentiment(data);

      setCurrentMood(sentiment.mood);
      onSentimentChange?.(sentiment);
      persistMoodHistory(sentiment);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "Hmm, I didn’t quite get that. Can you tell me more?",
          time: new Date(),
          sentiment,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
          time: new Date(),
          sentiment: { mood: "neutral", score: 5 },
        },
      ]);
      onSentimentChange?.({ mood: "neutral", score: 5 });
    } finally {
      setSending(false);
      setTyping(false);
    }
  };

  const downloadSummary = () => {
    const summary = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "Kai"}: ${msg.text}`)
      .join("\n");

    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kai-chat-summary.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const styles = {
    page: {
      minHeight: "calc(100vh - 62px)",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      color: "#edf5ff",
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      borderRadius: 24,
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 24px 70px rgba(2,6,23,0.42)",
      background: "rgba(10,18,30,0.45)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      background: "rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
    },
    titleWrap: { display: "flex", alignItems: "center", gap: 12 },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg, rgba(94,234,212,0.9), rgba(96,165,250,0.9))",
      color: "#08111e",
      fontWeight: 900,
      fontSize: 18,
      boxShadow: "0 12px 28px rgba(94,234,212,0.28)",
    },
    title: { margin: 0, fontSize: 18, fontWeight: 900, color: "#f8fbff" },
    subtext: { fontSize: 12, opacity: 0.78 },
    actions: { display: "flex", alignItems: "center", gap: 10 },
    headerBtn: {
      padding: "8px 12px",
      borderRadius: 10,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#f8fbff",
      cursor: "pointer",
      fontWeight: 700,
    },
    controlBtn: {
      padding: "8px 12px",
      borderRadius: 10,
      background: "rgba(94,234,212,0.12)",
      border: "1px solid rgba(94,234,212,0.3)",
      color: "#c9fff5",
      cursor: "pointer",
      fontWeight: 700,
    },
    messages: {
      overflowY: "auto",
      padding: "18px",
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    intro: {
      alignSelf: "center",
      padding: "8px 12px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      fontSize: 12,
      opacity: 0.8,
      marginBottom: 4,
    },
    row: { display: "flex", alignItems: "flex-end", gap: 8 },
    bubbleUser: {
      marginLeft: "auto",
      maxWidth: "78%",
      padding: "12px 14px",
      background: "linear-gradient(135deg, rgba(59,130,246,0.95), rgba(79,70,229,0.88))",
      borderRadius: "18px 18px 6px 18px",
      boxShadow: "0 12px 24px rgba(59,130,246,0.22)",
      color: "#eff6ff",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      lineHeight: 1.5,
      fontSize: 15,
    },
    bubbleBot: {
      marginRight: "auto",
      maxWidth: "78%",
      padding: "12px 14px",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "18px 18px 18px 6px",
      boxShadow: "0 14px 30px rgba(15,23,42,0.22)",
      color: "#edf5ff",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      lineHeight: 1.5,
      fontSize: 15,
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 8px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 800,
      marginBottom: 8,
      border: "1px solid",
      textTransform: "capitalize",
      letterSpacing: 0.2,
    },
    time: { fontSize: 11, opacity: 0.72, marginTop: 6 },
    quickReplies: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      padding: "0 18px 14px",
    },
    chip: {
      padding: "8px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      color: "#eaf6ff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
    },
    typing: {
      marginRight: "auto",
      padding: "8px 12px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 12,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      color: "#dfeeff",
    },
    dot: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: "#a5b4fc",
      animation: "blink 1.2s infinite ease-in-out",
    },
    inputBar: {
      padding: "12px 16px 16px",
      background: "rgba(255,255,255,0.04)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    },
    inputRow: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 10,
      alignItems: "center",
    },
    textarea: {
      width: "100%",
      minHeight: 52,
      maxHeight: 130,
      padding: "12px 14px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.14)",
      background: "rgba(255,255,255,0.06)",
      color: "#fff",
      outline: "none",
      resize: "vertical",
      fontSize: 15,
      lineHeight: "22px",
      boxSizing: "border-box",
    },
    sendBtn: {
      height: 52,
      padding: "0 18px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: 900,
      background: sending ? "rgba(94,234,212,0.35)" : "linear-gradient(135deg, #5eead4, #7dd3fc)",
      color: "#08131f",
      transition: "transform 0.15s ease",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
    },
    styleTag: `
      @keyframes blink {
        0% { opacity: .2; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(-2px); }
        100% { opacity: .2; transform: translateY(0); }
      }
    `,
  };

  const currentPalette = sentimentColors[currentMood] || sentimentColors.neutral;

  return (
    <div style={styles.page}>
      <style>{styles.styleTag}</style>

      <div style={styles.header}>
        <div style={styles.titleWrap}>
          <div style={styles.avatar}>K</div>
          <div>
            <h2 style={styles.title}>Chat with Kai</h2>
            <div style={styles.subtext}>Empathetic wellness companion</div>
          </div>
        </div>

        <div style={styles.actions}>
          <button style={styles.controlBtn} onClick={downloadSummary}>Download summary</button>
          <button style={styles.headerBtn} onClick={onBack}>Back</button>
        </div>
      </div>

      <div style={styles.messages}>
        <div style={styles.intro}>Kai can respond in English or Hinglish, depending on your tone.</div>

        {messages.map((msg, i) => {
          const palette = sentimentColors[msg.sentiment?.mood || currentMood] || sentimentColors.neutral;

          return (
            <div key={i} style={styles.row}>
              <div
                style={
                  msg.sender === "user"
                    ? { ...styles.bubbleUser, boxShadow: "0 12px 26px rgba(59,130,246,0.18)" }
                    : { ...styles.bubbleBot, borderColor: "rgba(255,255,255,0.12)" }
                }
              >
                {msg.sender === "bot" && msg.sentiment && (
                  <div
                    style={{
                      ...styles.badge,
                      background: palette.badge,
                      borderColor: palette.border,
                      color: palette.glow,
                    }}
                  >
                    {msg.sentiment.mood} · {msg.sentiment.score}/10
                  </div>
                )}
                <div>{msg.text}</div>
                {msg.time && <div style={styles.time}>{new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>}
              </div>
            </div>
          );
        })}

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

      <div style={styles.quickReplies}>
        {quickReplies.map((reply) => (
          <button key={reply} style={styles.chip} onClick={() => sendMessage(reply)}>
            {reply}
          </button>
        ))}
      </div>

      <div style={styles.inputBar}>
        <div style={styles.inputRow}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your thoughts here… (Enter to send, Shift + Enter for newline)"
            style={styles.textarea}
          />
          <button
            style={styles.sendBtn}
            onMouseOver={(e) => (e.currentTarget.style.transform = sending ? "none" : "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            onClick={() => sendMessage()}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
