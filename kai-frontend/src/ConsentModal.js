import React, { useState } from "react";

function ConsentModal({ onConsent, onViewPolicy, onViewTerms, onDecline }) {
  const [checked, setChecked] = useState(false);
  const [view, setView] = useState(null);

  const handleViewPolicy = () => {
    setView("policy");
    if (onViewPolicy) onViewPolicy();
  };

  const handleViewTerms = () => {
    setView("terms");
    if (onViewTerms) onViewTerms();
  };

  const renderPolicyView = () => (
    <div>
      <h3 style={{ margin: "0 0 12px", color: "#F6FAFF" }}>Privacy Policy</h3>
      <p style={{ margin: "0 0 10px" }}>
        KAI collects only the information you choose to share in your wellness check-ins and chat sessions to improve support quality and safety.
      </p>
      <p style={{ margin: "0 0 10px" }}>
        We do not sell personal data, and we limit access to stored mood and conversation data to your device and authorized app maintenance.
      </p>
      <p style={{ margin: 0 }}>
        Usage patterns may be aggregated in anonymized form to help improve the product experience, but no private details are shared publicly.
      </p>
    </div>
  );

  const renderTermsView = () => (
    <div>
      <h3 style={{ margin: "0 0 12px", color: "#F6FAFF" }}>Terms of Use</h3>
      <p style={{ margin: "0 0 10px" }}>
        KAI is a wellness support companion and is not a replacement for licensed medical care, therapy, or emergency response.
      </p>
      <p style={{ margin: "0 0 10px" }}>
        You are responsible for evaluating any guidance you receive and seeking qualified care when needed, especially for serious or urgent concerns.
      </p>
      <p style={{ margin: 0 }}>
        By continuing, you agree to use the app responsibly, protect your personal information, and avoid sharing sensitive data beyond what is necessary.
      </p>
    </div>
  );

  const renderMainView = () => (
    <>
      <p style={styles.intro}>
        To continue, please review and accept our privacy and usage terms for KAI’s wellness features.
      </p>

      <ul style={styles.list}>
        <li style={styles.li}>
          Conversations are intended for wellness support and self-reflection; they are not a substitute for professional care or emergency services.
        </li>
        <li style={styles.li}>
          Data is handled with care and stored securely with limited access; sensitive information is not sold or used for ads.
        </li>
        <li style={styles.li}>
          Aggregated and anonymized usage metrics may be used to improve features and safety.
        </li>
      </ul>

      <div style={styles.callout}>
        If this is an emergency or there is risk of harm, contact local emergency services or a crisis hotline in your area.
      </div>

      <div style={styles.checkboxRow}>
        <input
          type="checkbox"
          style={styles.checkbox}
          id="agree"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="agree">
          I have read and agree to the Privacy Policy and Terms of Use, and I understand KAI is for wellness support only.
        </label>
      </div>

      <div style={styles.linkBar}>
        <span style={styles.link} onClick={handleViewPolicy}>View Privacy Policy</span>
        <span style={styles.link} onClick={handleViewTerms}>View Terms of Use</span>
      </div>
    </>
  );

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(180deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.75) 100%)",
      zIndex: 1000,
      padding: "16px",
    },
    modal: {
      width: "100%",
      maxWidth: 560,
      background: "linear-gradient(135deg,#0b1220,#141a2b)",
      color: "#e7ecf3",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.12)",
      boxShadow: "0 18px 60px rgba(0,0,0,.45)",
      overflow: "hidden",
    },
    header: {
      padding: "18px 22px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 22,
      fontWeight: 900,
      margin: 0,
      color: "#F6FAFF",
    },
    badge: {
      padding: "6px 10px",
      borderRadius: 999,
      background: "rgba(52,211,153,.18)",
      border: "1px solid rgba(52,211,153,.35)",
      color: "#b6ffde",
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: 0.3,
    },
    body: { padding: "18px 22px", lineHeight: 1.7 },
    intro: { marginTop: 0, marginBottom: 10, opacity: 0.95 },
    list: { margin: "12px 0 0 0", paddingLeft: 18 },
    li: { marginBottom: 8, opacity: 0.95 },
    callout: {
      marginTop: 14,
      padding: 12,
      borderRadius: 12,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      fontSize: 14,
    },
    checkboxRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
      marginTop: 14,
    },
    checkbox: {
      width: 18,
      height: 18,
      accentColor: "#34d399",
      marginTop: 2,
      cursor: "pointer",
    },
    linkBar: {
      marginTop: 12,
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      fontSize: 14,
    },
    link: {
      color: "#a5f3fc",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 3,
    },
    footer: {
      padding: "16px 22px",
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      borderTop: "1px solid rgba(255,255,255,0.08)",
    },
    btn: {
      padding: "12px 16px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 15,
    },
    primary: {
      background: checked ? "#34d399" : "rgba(52,211,153,.35)",
      color: "#0a1220",
      boxShadow: "0 8px 22px rgba(52,211,153,.28)",
      transition: "transform .16s ease",
      pointerEvents: checked ? "auto" : "none",
    },
    secondary: {
      background: "rgba(255,255,255,0.08)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.12)",
    },
    danger: {
      background: "rgba(239,68,68,0.16)",
      color: "#fecaca",
      border: "1px solid rgba(239,68,68,0.35)",
    },
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 id="consent-title" style={styles.title}>Consent Required</h2>
          <span style={styles.badge}>Privacy‑First</span>
        </div>

        <div style={styles.body}>
          {view === "policy" ? renderPolicyView() : view === "terms" ? renderTermsView() : renderMainView()}
        </div>

        <div style={styles.footer}>
          <button
            style={{ ...styles.btn, ...styles.primary }}
            onMouseOver={(e) => (e.currentTarget.style.transform = checked ? "scale(1.03)" : "none")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            onClick={() => checked && onConsent && onConsent()}
            aria-disabled={!checked}
          >
            I Agree and Continue
          </button>
          <button style={{ ...styles.btn, ...styles.secondary }} onClick={handleViewPolicy}>
            Read Policy
          </button>
          <button style={{ ...styles.btn, ...styles.danger }} onClick={() => (onDecline ? onDecline() : setView(null))}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentModal;
