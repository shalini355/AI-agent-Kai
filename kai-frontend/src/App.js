import { useState, useMemo, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import ConsentModal from "./ConsentModal";
import Dashboard from "./Dashboard";
import WellnessActivities from "./WellnessActivities";
import Resources from "./Resources";
import Settings from "./Settings";
import Chat from "./Chat";
import ContactUs from "./ContactUs";
import AboutPage from "./AboutPage";

const sentimentPalettes = {
  happy: {
    background:
      "radial-gradient(circle at top left, rgba(251, 191, 36, 0.24), transparent 35%), radial-gradient(circle at bottom right, rgba(96, 165, 250, 0.18), transparent 30%), linear-gradient(135deg, #121a2d 0%, #1b243d 100%)",
    accent: "#fbbf24",
    text: "#edf5ff",
  },
  calm: {
    background:
      "radial-gradient(circle at top left, rgba(45, 212, 191, 0.26), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.15), transparent 35%), linear-gradient(135deg, #0a1528 0%, #11253e 100%)",
    accent: "#5eead4",
    text: "#edf5ff",
  },
  anxious: {
    background:
      "radial-gradient(circle at top left, rgba(251, 113, 133, 0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(244, 114, 182, 0.18), transparent 35%), linear-gradient(135deg, #1b1328 0%, #231d34 100%)",
    accent: "#fda4af",
    text: "#fdf2f8",
  },
  sad: {
    background:
      "radial-gradient(circle at top left, rgba(96, 165, 250, 0.2), transparent 35%), radial-gradient(circle at bottom right, rgba(96, 165, 250, 0.12), transparent 35%), linear-gradient(135deg, #0f1e32 0%, #172a46 100%)",
    accent: "#93c5fd",
    text: "#e0f2fe",
  },
  neutral: {
    background:
      "radial-gradient(circle at top left, rgba(148, 163, 184, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.12), transparent 35%), linear-gradient(135deg, #0b1220 0%, #141a2b 100%)",
    accent: "#a5b4fc",
    text: "#e7ecf3",
  },
};

function App() {
  const [page, setPage] = useState("welcome");
  const [consent, setConsent] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("kai_theme") || "dark");
  const [ambientMood, setAmbientMood] = useState("calm");
  const [ambientScore, setAmbientScore] = useState(7);

  useEffect(() => {
    localStorage.setItem("kai_theme", theme);
  }, [theme]);

  const palettes = {
    dark: {
      bg: "linear-gradient(135deg, #0b1220 0%, #141a2b 100%)",
      text: "#e7ecf3",
      navBg: "rgba(5, 10, 20, 0.5)",
      border: "1px solid rgba(255,255,255,0.08)",
      chip: "rgba(255,255,255,0.08)",
    },
    light: {
      bg: "linear-gradient(135deg, #f5f7fb 0%, #ffffff 100%)",
      text: "#0f172a",
      navBg: "rgba(255,255,255,0.72)",
      border: "1px solid rgba(2,6,23,0.08)",
      chip: "rgba(2,6,23,0.06)",
    },
  };

  const pal = palettes[theme];
  const currentPalette = sentimentPalettes[ambientMood] || sentimentPalettes.neutral;

  const styles = useMemo(
    () => ({
      app: {
        minHeight: "100vh",
        background:
          page === "welcome"
            ? `linear-gradient(135deg, rgba(8,14,24,0.84) 0%, rgba(17,34,52,0.92) 100%)`
            : currentPalette.background,
        color: currentPalette.text,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
        transition: "background 0.45s ease, color 0.45s ease",
        position: "relative",
      },
      glow: {
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at 20% 10%, ${currentPalette.accent} 0%, transparent 22%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.18), transparent 30%)`,
        opacity: 0.9,
        pointerEvents: "none",
      },
      nav: {
        display: consent ? "flex" : "none",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
        background: pal.navBg,
        borderBottom: pal.border,
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      },
      brand: { fontWeight: 800, letterSpacing: 1, fontSize: 22 },
      links: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" },
      link: {
        color: currentPalette.text,
        textDecoration: "none",
        background: pal.chip,
        padding: "6px 10px",
        borderRadius: 10,
        cursor: "pointer",
        border: pal.border,
      },
      content: { padding: consent ? 16 : 0, position: "relative", zIndex: 1 },
      statusBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(15, 23, 42, 0.38)",
        border: "1px solid rgba(255,255,255,0.12)",
        fontSize: 12,
        color: currentPalette.text,
      },
      dot: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: currentPalette.accent,
        boxShadow: `0 0 18px ${currentPalette.accent}`,
      },
    }),
    [ambientMood, consent, currentPalette, pal, page, theme]
  );

  const handleSentimentChange = (sentiment) => {
    if (!sentiment || !sentiment.mood) return;
    setAmbientMood(sentiment.mood);
    setAmbientScore(sentiment.score || 5);
  };

  const renderPage = () => {
    if (page === "welcome") {
      return (
        <WelcomeScreen
          onNext={() => setPage("consent")}
          onContact={() => setPage("contact")}
          onAbout={() => setPage("about")}
          theme={theme}
          setTheme={setTheme}
        />
      );
    }

    if (page === "consent" && !consent) {
      return (
        <ConsentModal
          onConsent={() => {
            setConsent(true);
            setPage("dashboard");
          }}
        />
      );
    }

    switch (page) {
      case "dashboard":
        return <Dashboard onNavigate={setPage} theme={theme} />;
      case "wellness":
        return <WellnessActivities setScreen={setPage} theme={theme} />;
      case "resources":
        return <Resources theme={theme} />;
      case "settings":
        return <Settings onBack={() => setPage("dashboard")} theme={theme} setTheme={setTheme} />;
      case "chat":
        return <Chat onBack={() => setPage("dashboard")} onSentimentChange={handleSentimentChange} theme={theme} />;
      case "contact":
        return <ContactUs onBack={() => setPage("welcome")} theme={theme} />;
      case "about":
        return <AboutPage onBack={() => setPage("welcome")} theme={theme} />;
      default:
        return <Dashboard onNavigate={setPage} theme={theme} />;
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.glow} />
      <div style={styles.nav}>
        <div style={styles.brand}>KAI</div>
        <div style={styles.links}>
          <span style={styles.link} onClick={() => setPage("dashboard")}>Dashboard</span>
          <span style={styles.link} onClick={() => setPage("chat")}>Chat</span>
          <span style={styles.link} onClick={() => setPage("wellness")}>Wellness</span>
          <span style={styles.link} onClick={() => setPage("resources")}>Resources</span>
          <span style={styles.link} onClick={() => setPage("about")}>About Us</span>
          <span style={styles.link} onClick={() => setPage("contact")}>Contact Us</span>
          <span style={styles.link} onClick={() => setPage("settings")}>Settings</span>
          <span
            style={{ ...styles.link, background: theme === "dark" ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.2)" }}
            onClick={() => {
              setConsent(false);
              setPage("welcome");
            }}
          >
            Sign Out
          </span>
          <span style={styles.statusBadge}>
            <span style={styles.dot} />
            Mood: {ambientMood} · {ambientScore}/10
          </span>
        </div>
      </div>
      <div style={styles.content}>{renderPage()}</div>
    </div>
  );
}

export default App;
