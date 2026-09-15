import React, { useState } from "react";
import { apiRequest } from "./services/api";

function ContactUs({ onBack, onSubmitSuccess, theme = "dark", token }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const isDark = theme === "dark";

  const page = {
    minHeight: "100vh",
    background: isDark ? "linear-gradient(135deg,#0b1220 0%, #141a2b 100%)" : "linear-gradient(135deg,#f5f7fb 0%, #ffffff 100%)",
    color: isDark ? "#e7ecf3" : "#0f172a",
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
  };
  const container = { maxWidth: 960, margin: "0 auto", padding: "24px" };
  const header = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 };
  const back = {
    padding: "8px 12px",
    borderRadius: 10,
    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(2,6,23,0.04)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(2,6,23,0.08)"}`,
    color: isDark ? "#fff" : "#0f172a",
    cursor: "pointer",
  };
  const card = {
    background: isDark ? "#0e1829" : "rgba(255,255,255,0.9)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(2,6,23,0.08)"}`,
    borderRadius: 16,
    padding: 24,
    boxShadow: isDark ? "0 10px 28px rgba(0,0,0,.35)" : "0 10px 28px rgba(2,6,23,0.08)",
  };
  const h1 = { fontSize: 32, fontWeight: 900, color: isDark ? "#f6faff" : "#0f172a", margin: "0 0 8px" };
  const sub = { opacity: 0.9, marginBottom: 18 };
  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 };
  const col = { display: "flex", flexDirection: "column", gap: 8 };
  const label = { fontWeight: 700, color: isDark ? "#f6faff" : "#0f172a" };
  const input = {
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(2,6,23,0.12)"}`,
    background: isDark ? "rgba(255,255,255,0.06)" : "rgba(2,6,23,0.02)",
    color: isDark ? "#fff" : "#0f172a",
    outline: "none",
  };
  const textarea = { ...input, minHeight: 140, resize: "vertical" };
  const actions = { marginTop: 16, display: "flex", gap: 10, alignItems: "center" };
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
    background: "#34d399",
    color: "#0a1220",
    boxShadow: "0 8px 22px rgba(52,211,153,.3)",
  };
  const ghost = {
    ...btn,
    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(2,6,23,0.04)",
    color: isDark ? "#fff" : "#0f172a",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(2,6,23,0.08)"}`,
  };
  const success = {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    background: "rgba(52,211,153,0.15)",
    border: "1px solid rgba(52,211,153,0.35)",
    color: "#b6ffde",
    fontWeight: 700,
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiRequest("/api/support", {
        method: "POST",
        body: JSON.stringify(form),
        token,
      });
    } catch (error) {
      setLoading(false);
      setSent(false);
      setError(error.message || "We could not send your request. Please try again.");
      return;
    }
    setLoading(false);
    setSent(true);
    onSubmitSuccess && onSubmitSuccess(form);
  };

  return (
    <div style={page}>
      <div style={container}>
        <div style={header}>
          <button style={back} onClick={onBack}>← Back</button>
        </div>

        <div style={card}>
          <h1 style={h1}>Contact Us</h1>
          <div style={sub}>Have questions or feedback? Send a message and the team will respond soon.</div>

          <form onSubmit={handleSubmit}>
            <div style={row}>
              <div style={col}>
                <label style={label}>Name</label>
                <input
                  style={input}
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={col}>
                <label style={label}>Email</label>
                <input
                  style={input}
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ ...col, marginTop: 16 }}>
              <label style={label}>Message</label>
              <textarea
                style={textarea}
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <div style={actions}>
              <button type="submit" style={primary} disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
              <button type="button" style={ghost} onClick={onBack}>
                Cancel
              </button>
            </div>

            {sent && <div style={success}>Thanks! Your message has been sent.</div>}
            {error && <div role="alert" style={{ ...success, background: "rgba(239,68,68,0.14)", borderColor: "rgba(239,68,68,0.35)", color: isDark ? "#fecaca" : "#b91c1c" }}>{error}</div>}
          </form>

          <div style={{ marginTop: 20, opacity: 0.9 }}>
            Email: hello@kaiwellness.app • Phone: +91 98765 43210
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
