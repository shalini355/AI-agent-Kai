import React, { useState, useMemo } from "react";

function WellnessActivities({ setScreen }) {
  const activities = [
    { type: "Journaling", content: "Write down 3 things you're grateful for today." },
    { type: "Journaling", content: "Describe one challenge you overcame recently." },
    { type: "Breathing", content: "Take 5 deep breaths, inhaling for 4 sec, exhaling for 4 sec." },
    { type: "Affirmation", content: "I am capable and strong." },
    { type: "Stretching", content: "Do a gentle neck stretch for 20 seconds." },
    { type: "Meditation", content: "Sit quietly and focus on your breath for 2 minutes." },
    { type: "Gratitude", content: "Write down one person you are thankful for." },
  ];

  const categories = useMemo(
    () => ["Journaling", "Breathing", "Affirmation", "Stretching", "Meditation", "Gratitude"],
    []
  );

  const [selectedType, setSelectedType] = useState("Journaling");
  const [index, setIndex] = useState(0);

  const filtered = activities.filter((a) => a.type === selectedType);
  const current = filtered[index] || null;

  const nextActivity = () => setIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));

  const ui = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0b1220 0%, #141a2b 100%)",
      color: "#e7ecf3",
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      padding: "32px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    wrap: { width: "100%", maxWidth: 920 },
    head: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      marginBottom: 12,
      flexWrap: "wrap",
    },
    badge: {
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: 999,
      background: "rgba(52,211,153,0.14)",
      border: "1px solid rgba(52,211,153,0.38)",
      color: "#baf7d6",
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.3,
      marginBottom: 8,
    },
    title: { fontSize: "clamp(24px, 4.8vw, 36px)", fontWeight: 900, color: "#F6FAFF", margin: 0 },
    sub: { opacity: 0.9 },
    chipRow: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      marginTop: 10,
      marginBottom: 18,
    },
    chip: (active) => ({
      padding: "8px 12px",
      borderRadius: 999,
      cursor: "pointer",
      border: `1px solid ${active ? "rgba(52,211,153,.5)" : "rgba(255,255,255,.16)"}`,
      background: active ? "rgba(52,211,153,.18)" : "rgba(255,255,255,.08)",
      color: "#fff",
      fontWeight: active ? 800 : 600,
      transition: "transform .15s ease",
    }),
    card: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 18,
      padding: 24,
      boxShadow: "0 16px 40px rgba(0,0,0,.35)",
      minHeight: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#F6FAFF",
      fontSize: "clamp(16px, 2.6vw, 20px)",
    },
    progress: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginTop: 12,
    },
    dot: (active) => ({
      width: 8,
      height: 8,
      borderRadius: 999,
      background: active ? "#34d399" : "rgba(255,255,255,.25)",
      border: `1px solid ${active ? "rgba(52,211,153,.6)" : "rgba(255,255,255,.18)"}`,
    }),
    actions: {
      display: "flex",
      justifyContent: "center",
      gap: 12,
      marginTop: 18,
      flexWrap: "wrap",
    },
    btn: {
      padding: "12px 20px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      boxShadow: "0 8px 20px rgba(0,0,0,.25)",
      transition: "transform .15s ease, box-shadow .15s ease",
    },
    primary: {
      background: "linear-gradient(135deg,#6366f1,#60a5fa)",
      color: "#fff",
      border: "1px solid rgba(96,165,250,.45)",
    },
  };

  return (
    <div style={ui.page}>
      <div style={ui.wrap}>
        {/* Title and active category */}
        <div style={{ marginBottom: 10 }}>
          <div style={ui.badge}>Ready-to-use wellness routines</div>
        </div>
        <div style={ui.head}>
          <h2 style={ui.title}>Wellness Toolkit</h2>
          <div style={ui.sub}>{selectedType}</div>
        </div>

        {/* Category chips */}
        <div style={ui.chipRow}>
          {categories.map((c) => {
            const active = c === selectedType;
            return (
              <span
                key={c}
                style={ui.chip(active)}
                onClick={() => {
                  setSelectedType(c);
                  setIndex(0);
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {c}
              </span>
            );
          })}
        </div>

        {/* Activity card */}
        <div style={ui.card}>
          {current ? current.content : "No activity found"}
        </div>

        {/* Progress dots */}
        <div style={ui.progress}>
          {filtered.length > 0 &&
            filtered.map((_, i) => <span key={i} style={ui.dot(i === index)} />)}
        </div>

        {/* Only Next button */}
        <div style={ui.actions}>
          <button
            style={{ ...ui.btn, ...ui.primary }}
            onClick={nextActivity}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,.35)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,.25)";
            }}
          >
            Next Activity
          </button>
        </div>
      </div>
    </div>
  );
}

export default WellnessActivities;
