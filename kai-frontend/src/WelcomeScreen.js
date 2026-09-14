import React, { useMemo, useState } from "react";

function WelcomeScreen({ onNext, onContact, onAbout }) {
  const bgUrl =
    "https://images.pexels.com/photos/33942904/pexels-photo-33942904.jpeg";

  // Local theme state
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light'
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Theme palettes
  const palette = useMemo(
    () =>
      theme === "dark"
        ? {
          pageBg: "#07101c",
          panelBgTop: "rgba(21,33,52,0.95)",
          panelBgBottom: "rgba(15,26,43,0.95)",
          cardBg: "#0E1829",
          text: "rgba(231,236,243,0.92)",
          heading: "#F6FAFF",
          chipBg: "rgba(255,255,255,0.08)",
          border: "rgba(255,255,255,0.10)",
          brand: "#34d399",
          shadowHero: "0 6px 24px rgba(0,0,0,.45)",
          overlay:
            "linear-gradient(to bottom, rgba(0,0,0,.65), rgba(7,14,26,.9) 70%, rgba(7,14,26,1) 100%)",
        }
        : {
          pageBg: "#f5f7fb",
          panelBgTop: "rgba(255,255,255,0.85)",
          panelBgBottom: "rgba(255,255,255,0.95)",
          cardBg: "#ffffff",
          text: "#334155",
          heading: "#0b1220",
          chipBg: "rgba(2,6,23,0.05)",
          border: "rgba(2,6,23,0.10)",
          brand: "#16a34a",
          shadowHero: "0 6px 24px rgba(2,6,23,.10)",
          overlay:
            "linear-gradient(to bottom, rgba(255,255,255,.25), rgba(245,247,251,1) 70%, rgba(245,247,251,1) 100%)",
        },
    [theme]
  );

  // Layout helpers
  const container = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  };

  const styles = {
    page: {
      position: "relative",
      minHeight: "100vh",
      color: palette.text,
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
      backgroundColor: palette.pageBg,
    },
    bg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "70vh",
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: theme === "light" ? "grayscale(12%) brightness(1.05)" : "none",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      height: "70vh",
      background: palette.overlay,
    },

    // Nav
    nav: {
      ...container,
      position: "relative",
      zIndex: 2,
      paddingTop: 18,
      paddingBottom: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    brand: {
      fontSize: 26,
      fontWeight: 800,
      letterSpacing: 1,
      color: palette.heading,
    },
    navRight: { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" },
    navLink: {
      cursor: "pointer",
      color: palette.text,
      padding: "8px 12px",
      borderRadius: 10,
      background: palette.chipBg,
      border: `1px solid ${palette.border}`,
    },
    themeBtn: {
      cursor: "pointer",
      padding: "8px 12px",
      borderRadius: 10,
      background: palette.chipBg,
      border: `1px solid ${palette.border}`,
      color: palette.heading,
      fontWeight: 700,
    },

    // Hero
    heroWrap: {
      ...container,
      position: "relative",
      zIndex: 2,
      paddingTop: 28,
      paddingBottom: 64,
    },
    h1: {
      fontSize: "clamp(38px, 7vw, 84px)",
      lineHeight: 1.06,
      fontWeight: 900,
      color: palette.heading,
      textShadow: palette.shadowHero,
      margin: "16px 0 10px",
    },
    sub: {
      marginTop: 8,
      maxWidth: 900,
      fontSize: "clamp(18px, 2.2vw, 22px)",
    },
    ctaRow: { marginTop: 28, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" },
    cta: {
      padding: "12px 22px",
      borderRadius: 14,
      background: palette.brand,
      color: theme === "light" ? "#0b1220" : "#0a1220",
      fontWeight: 800,
      fontSize: 18,
      border: `1px solid ${theme === "light" ? "#0d8a3f" : "#2cc58d"}`,
      cursor: "pointer",
      boxShadow: "0 10px 24px rgba(52,211,153,.28)",
      transition: "transform .18s ease",
    },
    stars: { display: "flex", alignItems: "center", gap: 4, fontSize: 20 },
    chip: {
      padding: "8px 14px",
      borderRadius: 999,
      background: palette.chipBg,
      border: `1px solid ${palette.border}`,
      color: palette.heading,
      fontSize: 14,
    },

    // Sections
    sections: {
      position: "relative",
      zIndex: 1,
      paddingTop: 24,
      paddingBottom: 80,
      background:
        theme === "light"
          ? "linear-gradient(180deg,#f5f7fb 0%, #ffffff 60%, #f5f7fb 100%)"
          : "linear-gradient(180deg, rgba(7,14,26,1) 0%, rgba(10,18,32,1) 60%, rgba(11,19,36,1) 100%)",
    },
    grid: {
      ...container,
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gap: 24,
      marginTop: 8,
    },
    card: {
      gridColumn: "span 12",
      background: palette.cardBg,
      borderRadius: 18,
      padding: 16,
      border: `1px solid ${palette.border}`,
      boxShadow: theme === "light" ? "0 8px 22px rgba(2,6,23,.08)" : "0 10px 28px rgba(0,0,0,.35)",
    },
    img: {
      width: "100%",
      height: 260,
      objectFit: "cover",
      borderRadius: 14,
      display: "block",
      backgroundColor: theme === "light" ? "#eef2f7" : "#0b1324",
    },
    h3: {
      fontSize: 24,
      fontWeight: 900,
      marginTop: 14,
      marginBottom: 6,
      color: palette.heading,
    },
    body: { fontSize: 16, lineHeight: 1.7 },

    // CTA Panel
    panelWrap: { ...container, marginTop: 40 },
    panel: {
      background: `linear-gradient(180deg, ${palette.panelBgTop} 0%, ${palette.panelBgBottom} 100%)`,
      border: `1px solid ${palette.border}`,
      borderRadius: 24,
      padding: "48px 24px",
      textAlign: "center",
      boxShadow: theme === "light" ? "0 24px 60px rgba(2,6,23,0.08)" : "0 24px 60px rgba(0,0,0,0.45)",
    },
    panelH2: {
      fontSize: "clamp(28px, 5vw, 52px)",
      fontWeight: 1000,
      lineHeight: 1.12,
      color: palette.heading,
      marginBottom: 16,
      letterSpacing: 0.2,
    },
    quote: {
      fontStyle: "italic",
      fontSize: "clamp(16px, 2vw, 20px)",
      marginBottom: 26,
    },
    panelBtn: {
      padding: "14px 28px",
      borderRadius: 14,
      background: palette.brand,
      color: theme === "light" ? "#0b1220" : "#0a1220",
      fontWeight: 800,
      fontSize: 18,
      border: `1px solid ${theme === "light" ? "#0d8a3f" : "#2cc58d"}`,
      cursor: "pointer",
      boxShadow: "0 10px 28px rgba(52,211,153,.28)",
      transition: "transform .18s ease",
    },

    // New blocks
    sectionTitleWrap: { ...container, marginTop: 28, marginBottom: 6 },
    sectionTitle: { fontSize: 22, fontWeight: 900, color: palette.heading },

    miniCard: {
      gridColumn: "span 12",
      background: palette.cardBg,
      borderRadius: 16,
      padding: 16,
      border: `1px solid ${palette.border}`,
      boxShadow: theme === "light" ? "0 8px 22px rgba(2,6,23,.06)" : "0 10px 24px rgba(0,0,0,.30)",
    },
    miniIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      display: "grid",
      placeItems: "center",
      background: theme === "light" ? "rgba(2,6,23,0.06)" : "rgba(255,255,255,0.12)",
      border: `1px solid ${palette.border}`,
      fontSize: 20,
      marginBottom: 10,
    },

    stepCard: {
      gridColumn: "span 12",
      background: palette.cardBg,
      borderRadius: 16,
      padding: 16,
      border: `1px solid ${palette.border}`,
      boxShadow: theme === "light" ? "0 8px 22px rgba(2,6,23,.06)" : "0 10px 24px rgba(0,0,0,.30)",
    },

    testimonials: { ...container, marginTop: 24, display: "grid", gap: 12 },
    testimonial: {
      background: palette.cardBg,
      border: `1px solid ${palette.border}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: theme === "light" ? "0 8px 22px rgba(2,6,23,.06)" : "0 10px 24px rgba(0,0,0,.30)",
      fontStyle: "italic",
    },

    badgesRow: {
      ...container,
      marginTop: 18,
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    badge: {
      padding: "8px 12px",
      borderRadius: 999,
      background: palette.chipBg,
      border: `1px solid ${palette.border}`,
      color: palette.heading,
      fontWeight: 800,
      fontSize: 13,
    },
  };

  // Responsive helpers
  const isWide = typeof window !== "undefined" && window.innerWidth >= 900;
  const halfSpan = isWide ? { gridColumn: "span 6" } : { gridColumn: "span 12" };
  const thirdSpan = isWide ? { gridColumn: "span 4" } : { gridColumn: "span 12" };
  const quarterSpan = isWide ? { gridColumn: "span 3" } : { gridColumn: "span 12" };

  return (
    <div style={styles.page}>
      {/* Hero background */}
      <div style={styles.bg} />
      <div style={styles.overlay} />

      {/* NAV */}
      <div style={styles.nav}>
        <div style={styles.brand}>KAI</div>
        <div style={styles.navRight}>
          {/* Removed Pricing */}
          <div
            style={styles.navLink}
            onClick={() => onAbout && onAbout()}
            title="About Us"
          >
            About Us
          </div>
          <div
            style={styles.navLink}
            onClick={() => onContact && onContact()}
            title="Contact Us"
          >
            Contact Us
          </div>
          <button
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
            onClick={toggleTheme}
            style={styles.themeBtn}
          >
            {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.heroWrap}>
        <h1 style={styles.h1}>
          A ready-to-use AI
          <br />
          wellness companion
        </h1>
        <div style={styles.sub}>
          Track your mood, reflect with intention, and access practical wellness support through a calm and trusted AI experience.
        </div>

        <div style={styles.ctaRow}>
          <button
            style={styles.cta}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={onNext}
          >
            Get Started
          </button>
          <div style={styles.stars}>
            <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
          </div>
          <div style={styles.chip}>AI Chat</div>
          <div style={styles.chip}>Mental Health</div>
        </div>
      </div>

      {/* SECTIONS */}
      <section
        style={{
          ...styles.sections,
          // small vertical offset to visually separate from hero
          marginTop: isWide ? 0 : -8,
        }}
      >
        {/* Row 1 (unchanged) */}
        <div style={styles.grid}>
          <div style={{ ...styles.card, ...halfSpan }}>
            <img
              style={styles.img}
              src="https://cdn.pixabay.com/photo/2025/05/08/15/07/mobile-phone-9587597_1280.png"
              alt="Mood tracking"
            />
            <h3 style={styles.h3}>Mood Tracking</h3>
            <p style={styles.body}>
              Effortlessly track your mood to gain insights and improve mental well‑being.
            </p>
          </div>
          <div style={{ ...styles.card, ...halfSpan }}>
            <img
              style={styles.img}
              src="https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1200&auto=format&fit=crop"
              alt="Journaling"
            />
            <h3 style={styles.h3}>Journaling Feature</h3>
            <p style={styles.body}>
              Easily journal your thoughts to reflect on emotions and experiences.
            </p>
          </div>
        </div>

        {/* Row 2 (unchanged) */}
        <div style={styles.grid}>
          <div style={{ ...styles.card, ...halfSpan }}>
            <img
              style={styles.img}
              src="https://cdn.pixabay.com/photo/2013/07/12/15/49/route-guidance-system-150365_1280.png"
              alt="Resources"
            />
            <h3 style={styles.h3}>Resource Navigator</h3>
            <p style={styles.body}>
              Access a wide range of mental health resources to support your journey.
            </p>
          </div>
          <div style={{ ...styles.card, ...halfSpan }}>
            <img
              style={styles.img}
              src="https://media.istockphoto.com/id/1488105257/photo/chatbot-powered-by-ai-transforming-industries-and-customer-service-yellow-chatbot-icon-over.jpg?s=1024x1024&w=is&k=20&c=Q4raY3uxy-_J15PgbIfOzIhndHkCQ-UFSkxVDBitJcI="
              alt="AI Support"
            />
            <h3 style={styles.h3}>AI‑Powered Support</h3>
            <p style={styles.body}>
              Receive personalized guidance through AI for a unique support experience.
            </p>
          </div>
        </div>

        {/* New: Features mini grid */}
        <div style={styles.sectionTitleWrap}>
          <div style={styles.sectionTitle}>More to love</div>
        </div>
        <div style={styles.grid}>
          <div style={{ ...styles.miniCard, ...quarterSpan }}>
            <div style={styles.miniIcon}>🔔</div>
            <h3 style={styles.h3}>Gentle reminders</h3>
            <p style={styles.body}>Optional nudges to check in without pressure.</p>
          </div>
          <div style={{ ...styles.miniCard, ...quarterSpan }}>
            <div style={styles.miniIcon}>📊</div>
            <h3 style={styles.h3}>Simple insights</h3>
            <p style={styles.body}>Spot patterns over days and weeks at a glance.</p>
          </div>
          <div style={{ ...styles.miniCard, ...quarterSpan }}>
            <div style={styles.miniIcon}>🔒</div>
            <h3 style={styles.h3}>Privacy-first</h3>
            <p style={styles.body}>No ads; export or delete data anytime.</p>
          </div>
          <div style={{ ...styles.miniCard, ...quarterSpan }}>
            <div style={styles.miniIcon}>🌿</div>
            <h3 style={styles.h3}>Wellness kit</h3>
            <p style={styles.body}>Breathing, journaling, and quick grounding.</p>
          </div>
        </div>

        {/* New: How it works */}
        <div style={styles.sectionTitleWrap}>
          <div style={styles.sectionTitle}>How it works</div>
        </div>
        <div style={styles.grid}>
          <div style={{ ...styles.stepCard, ...thirdSpan }}>
            <div style={styles.miniIcon}>📝</div>
            <h3 style={styles.h3}>1. Share</h3>
            <p style={styles.body}>Say how things are going—even a sentence helps.</p>
          </div>
          <div style={{ ...styles.stepCard, ...thirdSpan }}>
            <div style={styles.miniIcon}>✨</div>
            <h3 style={styles.h3}>2. Reflect</h3>
            <p style={styles.body}>Get gentle prompts and see trends over time.</p>
          </div>
          <div style={{ ...styles.stepCard, ...thirdSpan }}>
            <div style={styles.miniIcon}>🚀</div>
            <h3 style={styles.h3}>3. Grow</h3>
            <p style={styles.body}>Build small, steady habits that fit daily life.</p>
          </div>
        </div>

        {/* New: Testimonials */}
        <div style={styles.sectionTitleWrap}>
          <div style={styles.sectionTitle}>What people say</div>
        </div>
        <div style={styles.testimonials}>
          <div style={styles.testimonial}>
            “KAI helped me notice mood patterns and respond with more kindness.” – Priya
          </div>
          <div style={styles.testimonial}>
            “The journaling nudges are subtle but keep me consistent.” – Anil
          </div>
        </div>

        {/* New: Trust badges */}
        <div style={styles.badgesRow}>
          <div style={styles.badge}>No ads</div>
          <div style={styles.badge}>Export anytime</div>
          <div style={styles.badge}>Privacy-first</div>
          <div style={styles.badge}>Evidence-informed</div>
        </div>

        {/* CTA Panel (unchanged) */}
        <div style={styles.panelWrap}>
          <div style={styles.panel}>
            <h2 style={styles.panelH2}>Enhance Your Mental Well‑being with KAI</h2>
            <p style={styles.quote}>
              “The experience feels calm, supportive, and genuinely useful from the very first check-in.”
            </p>
            <button
              style={styles.panelBtn}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={onNext}   // now starts onboarding instead of opening Contact
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomeScreen;
