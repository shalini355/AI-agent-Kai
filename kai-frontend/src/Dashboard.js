import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { analyzeMood } from "./moodUtils";

function Dashboard({ onNavigate }) {
  const [showChecker, setShowChecker] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("kai_mood_history") || "[]");
      setMoodHistory(stored);
    } catch (error) {
      console.error("Failed to load mood history", error);
    }
  }, []);

  const chartData = useMemo(() => {
    return moodHistory.map((entry, index) => ({
      name: index === 0 ? "Now" : `${index + 1}`,
      score: entry.score,
      mood: entry.mood,
      time: new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }));
  }, [moodHistory]);

  const latestMood = moodHistory[moodHistory.length - 1];
  const averageScore =
    moodHistory.length === 0
      ? 0
      : Math.round(
          moodHistory.reduce((total, item) => total + Number(item.score || 0), 0) / moodHistory.length
        );

  const colors = {
    bgFrom: "#0b1220",
    bgTo: "#141a2b",
    card: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
    text: "rgba(231,236,243,0.95)",
    heading: "#F6FAFF",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors.bgFrom} 0%, ${colors.bgTo} 100%)`,
      color: colors.text,
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    card: {
      width: "100%",
      maxWidth: 1100,
      background: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: 24,
      padding: 24,
      boxShadow: "0 16px 48px rgba(0,0,0,.45)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18,
      gap: 12,
      flexWrap: "wrap",
    },
    titleWrap: { display: "flex", alignItems: "center", gap: 12 },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 14,
      background: "linear-gradient(135deg, rgba(52,211,153,0.85), rgba(59,130,246,0.85))",
      display: "grid",
      placeItems: "center",
      color: "#0a1220",
      fontWeight: 900,
      fontSize: 20,
    },
    title: { fontSize: 30, fontWeight: 900, color: colors.heading, margin: 0 },
    subtitle: { opacity: 0.9, fontSize: 14 },
    headerActions: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
    button: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.12)",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      fontWeight: 800,
      cursor: "pointer",
    },
    buttonPrimary: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(135deg, #5eead4, #7dd3fc)",
      color: "#04111d",
      fontWeight: 900,
      cursor: "pointer",
    },
    topRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: 16,
      marginBottom: 16,
    },
    statCard: {
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${colors.border}`,
      borderRadius: 18,
      padding: 16,
      boxShadow: "0 10px 20px rgba(0,0,0,0.14)",
    },
    statLabel: { fontSize: 12, opacity: 0.75, marginBottom: 6 },
    statValue: { fontWeight: 900, fontSize: 28, color: colors.heading },
    statMeta: { marginTop: 4, fontSize: 12, opacity: 0.8 },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: 16,
      marginTop: 16,
    },
    tile: {
      gridColumn: "span 6",
      background: "rgba(255,255,255,0.08)",
      border: `1px solid ${colors.border}`,
      borderRadius: 16,
      padding: 18,
      display: "flex",
      alignItems: "center",
      gap: 14,
      color: "#fff",
      cursor: "pointer",
      transition: "transform .18s ease, box-shadow .18s ease",
      boxShadow: "0 8px 22px rgba(0,0,0,.28)",
    },
    icon: {
      width: 42,
      height: 42,
      borderRadius: 12,
      display: "grid",
      placeItems: "center",
      fontSize: 20,
      background: "rgba(255,255,255,0.12)",
      border: `1px solid ${colors.border}`,
    },
    tileText: { display: "grid", gap: 4 },
    tileTitle: { fontWeight: 800, color: colors.heading },
    tileSub: { fontSize: 13, opacity: 0.9 },
    blue: { background: "linear-gradient(135deg,#1e3a8a,#2563eb)" },
    purple: { background: "linear-gradient(135deg,#6d28d9,#7c3aed)" },
    green: { background: "linear-gradient(135deg,#0f766e,#16a34a)" },
    yellow: { background: "linear-gradient(135deg,#ca8a04,#f59e0b)" },
    panel: {
      gridColumn: "span 12",
      marginTop: 8,
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${colors.border}`,
      borderRadius: 16,
      padding: 16,
    },
    row: { display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap" },
    input: {
      flex: 1,
      minWidth: 240,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,255,255,0.18)",
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      outline: "none",
    },
    btn: {
      padding: "12px 16px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      background: "#34d399",
      color: "#0a1220",
    },
    note: {
      marginTop: 8,
      padding: 12,
      borderRadius: 12,
      background: "rgba(255,255,255,0.06)",
      border: `1px solid ${colors.border}`,
      fontSize: 14,
    },
    tag: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: 999,
      background: "rgba(52,211,153,0.18)",
      border: "1px solid rgba(52,211,153,0.35)",
      color: "#b6ffde",
      fontWeight: 800,
      marginLeft: 8,
      fontSize: 12,
      textTransform: "capitalize",
    },
    drawerBackdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(2, 6, 23, 0.54)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "flex-end",
      zIndex: 50,
    },
    drawer: {
      width: "min(520px, 90vw)",
      height: "100%",
      background: "rgba(13,20,32,0.96)",
      borderLeft: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "-30px 0 60px rgba(2,6,23,0.34)",
      padding: 24,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    drawerTitle: { margin: 0, fontSize: 24, fontWeight: 900, color: colors.heading },
    chartWrapper: { height: 260, marginTop: 12 },
    empty: {
      textAlign: "center",
      padding: "32px 12px",
      borderRadius: 16,
      border: `1px dashed ${colors.border}`,
      opacity: 0.85,
    },
  };

  const raise = (e) => {
    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
    e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,.38)";
  };
  const lower = (e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = "0 8px 22px rgba(0,0,0,.28)";
  };

  const isWide = typeof window !== "undefined" && window.innerWidth >= 800;
  const span = isWide ? { gridColumn: "span 6" } : { gridColumn: "span 12" };

  const runCheck = () => {
    const r = analyzeMood(text);
    setResult(r);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.titleWrap}>
            <div style={styles.logo}>K</div>
            <div>
              <h1 style={styles.title}>KAI Dashboard</h1>
              <div style={styles.subtitle}>Personal wellness overview</div>
            </div>
          </div>

          <div style={styles.headerActions}>
            <button style={styles.buttonPrimary} onClick={() => setShowHistory(true)}>
              Mood History
            </button>
            <button style={styles.button} onClick={() => onNavigate("chat")}>
              Chat with Kai
            </button>
          </div>
        </div>

        <div style={styles.topRow}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Latest Mood Check-in</div>
            <div style={styles.statValue}>{latestMood ? latestMood.mood : "Neutral"}</div>
            <div style={styles.statMeta}>{latestMood ? `${latestMood.score}/10` : "0/10"}</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Mood Trend</div>
            <div style={styles.statValue}>{averageScore}</div>
            <div style={styles.statMeta}>Average across recent check-ins</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Saved Insights</div>
            <div style={styles.statValue}>{moodHistory.length}</div>
            <div style={styles.statMeta}>Tracked on this device for quick review</div>
          </div>
        </div>

        <div style={styles.grid}>
          <div
            style={{ ...styles.tile, ...span, borderColor: "rgba(37,99,235,.35)" }}
            onMouseOver={raise}
            onMouseOut={lower}
            onClick={() => onNavigate("chat")}
          >
            <div style={{ ...styles.icon, ...styles.blue }}>💬</div>
            <div style={styles.tileText}>
              <div style={styles.tileTitle}>Chat with KAI</div>
              <div style={styles.tileSub}>Start a supportive conversation</div>
            </div>
          </div>

          <div
            style={{ ...styles.tile, ...span, borderColor: "rgba(124,58,237,.35)" }}
            onMouseOver={raise}
            onMouseOut={lower}
            onClick={() => onNavigate("wellness")}
          >
            <div style={{ ...styles.icon, ...styles.purple }}>🌿</div>
            <div style={styles.tileText}>
              <div style={styles.tileTitle}>Wellness Activities</div>
              <div style={styles.tileSub}>Breathing, journaling, routines</div>
            </div>
          </div>

          <div
            style={{ ...styles.tile, ...span, borderColor: "rgba(22,163,74,.35)" }}
            onMouseOver={raise}
            onMouseOut={lower}
            onClick={() => onNavigate("resources")}
          >
            <div style={{ ...styles.icon, ...styles.green }}>📚</div>
            <div style={styles.tileText}>
              <div style={styles.tileTitle}>Resources</div>
              <div style={styles.tileSub}>Reliable guides and links</div>
            </div>
          </div>

          <div
            style={{ ...styles.tile, ...span, borderColor: "rgba(234,179,8,.35)" }}
            onMouseOver={raise}
            onMouseOut={lower}
            onClick={() => setShowChecker((s) => !s)}
            title="Quick mood check"
          >
            <div style={{ ...styles.icon, ...styles.yellow }}>🙂</div>
            <div style={styles.tileText}>
              <div style={styles.tileTitle}>Mood Checker</div>
              <div style={styles.tileSub}>Type a feeling to get a tip</div>
            </div>
          </div>

          {showChecker && (
            <div style={styles.panel}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="How do you feel? (e.g., I'm happy today)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button style={styles.btn} onClick={runCheck}>
                  Analyze
                </button>
              </div>
              {result && (
                <div style={styles.note}>
                  <div>
                    Mood: {result.label}
                    <span style={styles.tag}>{result.mood}</span>
                  </div>
                  <div style={{ marginTop: 6 }}>{result.response}</div>
                  <div style={{ marginTop: 6, opacity: 0.9 }}>Tip: {result.tip}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showHistory && (
        <div style={styles.drawerBackdrop} onClick={() => setShowHistory(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div style={styles.drawerHeader}>
              <h3 style={styles.drawerTitle}>Mood History</h3>
              <button style={styles.button} onClick={() => setShowHistory(false)}>
                Close
              </button>
            </div>

            {chartData.length > 0 ? (
              <div style={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="aiMoodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5eead4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0.15} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="time" stroke="#dfeeff" tickLine={false} axisLine={false} />
                    <YAxis domain={[1, 10]} stroke="#dfeeff" tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.96)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        color: "#edf5ff",
                      }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#5eead4" fill="url(#aiMoodGradient)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={styles.empty}>No mood history yet. Start chatting with Kai to build your insight timeline.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
