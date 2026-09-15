import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled frontend error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, fontFamily: "sans-serif", color: "#0f172a" }}>
          <section style={{ maxWidth: 520, textAlign: "center" }}>
            <h1>Something went wrong</h1>
            <p>Reload KAI to continue. Your saved account data is not affected.</p>
            <button type="button" onClick={() => window.location.reload()} style={{ padding: "10px 16px", border: 0, borderRadius: 8, background: "#0f766e", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
              Reload KAI
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
