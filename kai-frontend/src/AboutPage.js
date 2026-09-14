import React from "react";

function AboutPage({ onBack }) {
  const colors = {
    bgFrom: "#0b1220",
    bgTo: "#141a2b",
    card: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
    text: "rgba(231,236,243,0.92)",
    heading: "#F6FAFF",
    accent: "#34d399",
  };

  const page = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${colors.bgFrom} 0%, ${colors.bgTo} 100%)`,
    color: colors.text,
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    padding: 24,
  };

  const container = { maxWidth: 1100, margin: "0 auto" };

  const header = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  };

  const back = {
    padding: "10px 14px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    border: `1px solid ${colors.border}`,
    color: "#fff",
    cursor: "pointer",
  };

  const hero = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 20,
    padding: "28px 24px",
    boxShadow: "0 12px 28px rgba(0,0,0,.35)",
    marginBottom: 24,
  };

  const h1 = {
    fontSize: "clamp(28px, 6vw, 44px)",
    fontWeight: 900,
    color: colors.heading,
    margin: 0,
  };

  const lead = {
    marginTop: 10,
    fontSize: "clamp(16px, 2.4vw, 18px)",
    opacity: 0.95,
  };

  const section = {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 20,
    marginTop: 24,
  };

  const card = {
    gridColumn: "span 12",
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 18,
    padding: 20,
    boxShadow: "0 10px 24px rgba(0,0,0,.28)",
  };

  const split = (span = 6) => ({
    ...card,
    gridColumn: `span ${span}`,
  });

  const h2 = {
    fontSize: 24,
    fontWeight: 900,
    color: colors.heading,
    margin: "0 0 10px",
  };

  const p = {
    lineHeight: 1.7,
    opacity: 0.95,
    margin: "8px 0",
  };

  const list = { margin: "10px 0 0 0", padding: 0, listStyle: "none" };
  const li = {
    padding: "10px 12px",
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${colors.border}`,
    borderRadius: 12,
    marginTop: 10,
  };

  const badge = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(52,211,153,0.18)",
    border: "1px solid rgba(52,211,153,0.35)",
    color: "#b6ffde",
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: 0.3,
    marginLeft: 8,
  };

  const stats = {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 12,
  };

  const stat = {
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${colors.border}`,
    borderRadius: 14,
    padding: "12px 16px",
    minWidth: 160,
  };

  const statNum = { fontSize: 22, fontWeight: 900, color: colors.heading };
  const statLabel = { fontSize: 13, opacity: 0.9 };

  const cta = {
    marginTop: 26,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  };

  const btn = {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 16,
  };
  const primary = {
    ...btn,
    background: colors.accent,
    color: "#0a1220",
    boxShadow: "0 8px 22px rgba(52,211,153,.28)",
  };
  const secondary = {
    ...btn,
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    border: `1px solid ${colors.border}`,
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={header}>
          <button style={back} onClick={onBack}>← Back</button>
        </div>

        {/* Hero */}
        <div style={hero}>
          <h1 style={h1}>About KAI</h1>
          <p style={lead}>
            KAI is a production-ready AI wellness companion built over the past year
            through design iteration, user feedback, and continuous engineering
            refinement. It helps people track moods, reflect with clarity, and find
            practical support in a calm, trustworthy experience.
          </p>
        </div>

        {/* Mission + Vision */}
        <div style={section}>
          <div style={split(6)}>
            <h2 style={h2}>Our Mission</h2>
            <p style={p}>
              Make mental wellness support simple, stigma‑free, and available to
              anyone, anywhere—through safe conversation, meaningful insights, and
              day‑to‑day guidance.
            </p>
          </div>
          <div style={split(6)}>
            <h2 style={h2}>Our Vision</h2>
            <p style={p}>
              A world where proactive mental health care is part of daily life and
              every person has a supportive companion in their pocket.
            </p>
          </div>
        </div>

        {/* Values */}
        <div style={section}>
          <div style={split(12)}>
            <h2 style={h2}>What We Value</h2>
            <ul style={list}>
              <li style={li}>
                Privacy‑first design
                <span style={badge}>Secure</span>
                <p style={p}>Data stays confidential with transparent controls.</p>
              </li>
              <li style={li}>
                Compassionate support
                <span style={badge}>Human‑centered</span>
                <p style={p}>Language that’s kind, non‑judgmental, and inclusive.</p>
              </li>
              <li style={li}>
                Evidence‑informed guidance
                <span style={badge}>Research‑guided</span>
                <p style={p}>Features inspired by established mental‑health practices.</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Team + Impact */}
        <div style={section}>
          <div style={split(6)}>
            <h2 style={h2}>The Team</h2>
            <p style={p}>
              A focused team of designers and engineers building a wellness product
              that feels supportive, useful, and ready for everyday use.
            </p>
            <div style={stats}>
              <div style={stat}>
                <div style={statNum}>1</div>
                <div style={statLabel}>Year of product development</div>
              </div>
              <div style={stat}>
                <div style={statNum}>100%</div>
                <div style={statLabel}>Focus on user-centered design</div>
              </div>
              <div style={stat}>
                <div style={statNum}>Daily</div>
                <div style={statLabel}>Wellness improvements through feedback</div>
              </div>
            </div>
          </div>

          <div style={split(6)}>
            <h2 style={h2}>How We Help</h2>
            <p style={p}>
              KAI blends mood tracking, journaling, and gentle coaching to help
              users notice patterns, manage emotions, and build resilient routines.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div style={section}>
          <div style={split(12)}>
            <h2 style={h2}>Milestones</h2>
            <ul style={list}>
              <li style={li}><strong>Year 1:</strong> Product research, concept validation, and UX exploration.</li>
              <li style={li}><strong>Year 1:</strong> Core MVP launch with AI chat, mood tracking, and curated resources.</li>
              <li style={li}><strong>Today:</strong> Production-oriented refinement for a ready-to-use wellness experience.</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div style={section}>
          <div style={split(12)}>
            <h2 style={h2}>Join the Journey</h2>
            <p style={p}>
              Whether an individual, therapist, or organization, partner with KAI to
              bring accessible mental wellness support to more people.
            </p>
            <div style={cta}>
              <button
                style={primary}
                onClick={() => window?.dispatchEvent?.(new CustomEvent("open-contact"))}
              >
                Contact Us
              </button>
              <button style={secondary} onClick={onBack}>
                Back to App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
