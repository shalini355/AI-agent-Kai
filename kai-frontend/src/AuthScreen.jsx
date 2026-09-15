import { useState } from "react";
import { apiRequest } from "./services/api";

function AuthScreen({ onAuthenticated, theme = "dark" }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isDark = theme === "dark";

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const data = await apiRequest(`/api/auth/${mode}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        timeoutMs: 10000,
      });
      sessionStorage.setItem("kai_access_token", data.token);
      onAuthenticated(data.user);
    } catch (requestError) {
      setError(requestError.message || "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const colors = isDark
    ? { page: "#0b1220", card: "rgba(255,255,255,0.08)", text: "#e7ecf3", heading: "#f6faff", border: "rgba(255,255,255,0.14)", input: "rgba(255,255,255,0.07)" }
    : { page: "#f5f7fb", card: "#ffffff", text: "#334155", heading: "#0f172a", border: "rgba(2,6,23,0.12)", input: "#f8fafc" };

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: `linear-gradient(135deg, ${colors.page}, ${isDark ? "#14243b" : "#ffffff"})`, color: colors.text }}>
      <section style={{ width: "100%", maxWidth: 440, padding: 28, borderRadius: 20, background: colors.card, border: `1px solid ${colors.border}`, boxShadow: "0 20px 60px rgba(2,6,23,0.2)" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#34d399", fontWeight: 900, letterSpacing: 1 }}>KAI</div>
          <h1 style={{ margin: "8px 0", color: colors.heading }}>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
          <p style={{ margin: 0 }}>Your wellness data stays tied to your account and can be managed from the app.</p>
        </div>

        <form onSubmit={submit}>
          <label style={{ display: "grid", gap: 8, marginBottom: 14 }}>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} autoComplete="email" style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, background: colors.input, color: colors.heading }} />
          </label>
          <label style={{ display: "grid", gap: 8, marginBottom: 14 }}>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={12} maxLength={128} autoComplete={mode === "login" ? "current-password" : "new-password"} style={{ padding: "12px 14px", borderRadius: 10, border: `1px solid ${colors.border}`, background: colors.input, color: colors.heading }} />
          </label>

          {error && <div role="alert" style={{ marginBottom: 14, padding: 12, borderRadius: 10, background: "rgba(239,68,68,0.14)", color: isDark ? "#fecaca" : "#b91c1c" }}>{error}</div>}

          <button type="submit" disabled={busy} style={{ width: "100%", padding: "12px 16px", border: 0, borderRadius: 10, background: "#34d399", color: "#06121c", fontWeight: 900, cursor: busy ? "wait" : "pointer" }}>
            {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button type="button" onClick={() => { setMode((current) => (current === "login" ? "register" : "login")); setError(""); }} style={{ marginTop: 16, padding: 0, border: 0, background: "transparent", color: isDark ? "#a5f3fc" : "#0f766e", cursor: "pointer" }}>
          {mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </section>
    </main>
  );
}

export default AuthScreen;
