import React, { useState, useMemo, useEffect } from "react";

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

  const icons = {
    Journaling: "✍️",
    Breathing: "🌬️",
    Affirmation: "✨",
    Stretching: "🧘",
    Meditation: "🫧",
    Gratitude: "💛",
  };

  const [selectedType, setSelectedType] = useState("Breathing");
  const [index, setIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(3);

  useEffect(() => {
    if (!isActive) return undefined;

    const timer = setInterval(() => {
      setMinutesLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000);

    return () => clearInterval(timer);
  }, [isActive]);

  const filtered = activities.filter((a) => a.type === selectedType);
  const current = filtered[index] || filtered[0] || null;
  const progressPct = filtered.length > 0 ? Math.round(((index + 1) / filtered.length) * 100) : 0;

  const nextActivity = () => {
    setIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
    setMinutesLeft(3);
  };

  const ui = {
    page: {
      minHeight: "100vh",
      background: "radial-gradient(circle at top left, rgba(45, 212, 191, 0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(96, 165, 250, 0.18), transparent 32%), linear-gradient(135deg, #0b1220 0%, #101a2d 100%)",
      color: "#e7ecf3",
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      padding: "32px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    shell: { width: "100%", maxWidth: 980 },
    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 22,
      gap: 12,
      flexWrap: "wrap",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "7px 12px",
      borderRadius: 999,
      background: "rgba(94,234,212,0.12)",
      border: "1px solid rgba(94,234,212,0.42)",
      color: "#bdf8ee",
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.3,
    },
    secondary: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.05)",
      color: "#edf6ff",
      fontWeight: 700,
      cursor: "pointer",
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "1.3fr 0.9fr",
      gap: 18,
      alignItems: "stretch",
      marginBottom: 18,
    },
    heroCard: {
      background: "rgba(15, 23, 42, 0.72)",
      borderRadius: 22,
      border: "1px solid rgba(148, 163, 184, 0.18)",
      padding: 22,
      boxShadow: "0 18px 36px rgba(2,6,23,0.35)",
    },
    kicker: {
      color: "#a5f3fc",
      textTransform: "uppercase",
      letterSpacing: 1,
      fontSize: 11,
      fontWeight: 800,
      marginBottom: 10,
    },
    title: { fontSize: "clamp(28px, 4.3vw, 42px)", fontWeight: 900, margin: 0, color: "#F6FAFF" },
    subtitle: {
      marginTop: 12,
      marginBottom: 0,
      fontSize: 15,
      color: "rgba(226,232,240,0.8)",
      lineHeight: 1.6,
      maxWidth: 500,
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
    },
    statBox: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18,
      padding: "16px 14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    statLabel: { fontSize: 12, marginBottom: 8, letterSpacing: 0.3, opacity: 0.8 },
    statValue: { fontSize: 28, fontWeight: 800, color: "#fff" },
    contentGrid: {
      display: "grid",
      gridTemplateColumns: "240px 1fr",
      gap: 18,
      alignItems: "stretch",
    },
    sidebar: {
      background: "rgba(15, 23, 42, 0.62)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      borderRadius: 20,
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    categoryButton: (active) => ({
      width: "100%",
      border: active ? "1px solid rgba(94,234,212,0.5)" : "1px solid rgba(255,255,255,0.08)",
      background: active ? "rgba(94,234,212,0.12)" : "rgba(255,255,255,0.03)",
      color: active ? "#dffef8" : "#e2e8f0",
      borderRadius: 12,
      padding: "12px 10px",
      fontWeight: 700,
      textAlign: "left",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all .15s ease",
    }),
    mainCard: {
      background: "rgba(15, 23, 42, 0.72)",
      border: "1px solid rgba(148, 163, 184, 0.18)",
      borderRadius: 24,
      padding: 22,
      boxShadow: "0 20px 40px rgba(2,6,23,0.36)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
      fontWeight: 700,
      color: "#dbeafe",
    },
    iconWrap: {
      width: 66,
      height: 66,
      borderRadius: 18,
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(59,130,246,0.2))",
      border: "1px solid rgba(96,165,250,0.3)",
      fontSize: 26,
      marginBottom: 16,
    },
    activityTitle: { margin: 0, fontSize: 18, color: "#f8fbff" },
    activityText: {
      margin: "16px 0 18px",
      fontSize: "clamp(17px, 2.6vw, 24px)",
      lineHeight: 1.55,
      color: "#f8fafc",
      fontWeight: 600,
    },
    progressWrap: { marginTop: 8 },
    progressBar: {
      width: "100%",
      height: 10,
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    progressFill: {
      height: "100%",
      width: `${progressPct}%`,
      borderRadius: 999,
      background: "linear-gradient(90deg, #34d399 0%, #60a5fa 100%)",
      transition: "width .2s ease",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      marginTop: 22,
      flexWrap: "wrap",
    },
    btn: {
      padding: "12px 18px",
      borderRadius: 14,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      transition: "transform .15s ease, box-shadow .15s ease",
    },
    primary: {
      background: "linear-gradient(135deg,#6366f1 0%,#60a5fa 100%)",
      color: "#fff",
      boxShadow: "0 10px 24px rgba(96, 165, 250, 0.3)",
      border: "1px solid rgba(96,165,250,0.45)",
    },
    secondaryBtn: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#f8fbff",
    },
  };

  return (
    <div style={ui.page}>
      <div style={ui.shell}>
        <div style={ui.topbar}>
          <div style={ui.badge}>Ready-to-use wellness routines</div>
          <button style={ui.secondary} onClick={() => setScreen("dashboard")}>Back to dashboard</button>
        </div>

        <div style={ui.hero}>
          <div style={ui.heroCard}>
            <div style={ui.kicker}>Daily support</div>
            <h2 style={ui.title}>Wellness Toolkit</h2>
            <p style={ui.subtitle}>
              Choose a calming practice, follow a quick reset, and keep momentum with gentle,
              supportive reminders designed for everyday balance.
            </p>
          </div>

          <div style={ui.statsGrid}>
            <div style={ui.statBox}>
              <div style={ui.statLabel}>Session</div>
              <div style={ui.statValue}>{minutesLeft} min</div>
            </div>
            <div style={ui.statBox}>
              <div style={ui.statLabel}>Focus</div>
              <div style={ui.statValue}>{filtered.length}</div>
            </div>
            <div style={ui.statBox}>
              <div style={ui.statLabel}>Streak</div>
              <div style={ui.statValue}>5 days</div>
            </div>
            <div style={ui.statBox}>
              <div style={ui.statLabel}>Mood</div>
              <div style={ui.statValue}>Calm</div>
            </div>
          </div>
        </div>

        <div style={ui.contentGrid}>
          <div style={ui.sidebar}>
            {categories.map((category) => {
              const active = category === selectedType;
              return (
                <button
                  key={category}
                  style={ui.categoryButton(active)}
                  onClick={() => {
                    setSelectedType(category);
                    setIndex(0);
                    setMinutesLeft(3);
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span>{category}</span>
                  <span>{icons[category]}</span>
                </button>
              );
            })}
          </div>

          <div style={ui.mainCard}>
            <div style={ui.cardHeader}>
              <span>{selectedType}</span>
              <span>
                {filtered.length > 0 ? `${index + 1}/${filtered.length}` : "0/0"}
              </span>
            </div>

            <div style={ui.iconWrap}>{current ? icons[current.type] : "✨"}</div>
            <h3 style={ui.activityTitle}>{current ? `${current.type} prompt` : "No activity"}</h3>
            <div style={ui.activityText}>{current ? current.content : "Choose a category to begin."}</div>

            <div style={ui.progressWrap}>
              <div style={ui.progressBar}>
                <div style={ui.progressFill} />
              </div>
            </div>

            <div style={ui.actions}>
              <button
                style={{ ...ui.btn, ...ui.primary }}
                onClick={() => setIsActive((prev) => !prev)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px) scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                }}
              >
                {isActive ? "Pause routine" : "Start routine"}
              </button>

              <button
                style={{ ...ui.btn, ...ui.secondaryBtn }}
                onClick={nextActivity}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px) scale(1.01)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                }}
              >
                Next activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WellnessActivities;
