import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Family Budget App crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            background: "#FBF6EC",
            fontFamily: "Inter, sans-serif",
            padding: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40 }}>⚠️</div>
          <div style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 18, color: "#1F4B4A" }}>
            Kuch gadbad ho gayi
          </div>
          <div style={{ fontSize: 13, color: "#7A7160", maxWidth: 320 }}>
            App mein ek unexpected error aaya. Aapka saved data safe hai — page ko reload try karein.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              background: "#1F4B4A",
              color: "#FBF6EC",
              border: "none",
              borderRadius: 12,
              padding: "10px 20px",
              fontFamily: "'Baloo 2', sans-serif",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
