import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login() {
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      navigate("/");
      // Force navbar to re-read localStorage
      window.dispatchEvent(new Event("storage"));
    } else {
      setError(result.error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "75vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div className="checkout-form" style={{ width: 400, maxWidth: "100%", margin: "0 auto" }}>
        <h2>Sign In</h2>
        <input
          placeholder="Email ID"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>
          Login
        </button>
        {error && <p style={{ color: "#ef4444", textAlign: "center", marginTop: "16px", fontWeight: "600" }}>{error}</p>}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "var(--text-muted)" }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "var(--primaryHover)", textDecoration: "none", fontWeight: "600" }}>Create one now</Link>
        </div>
      </div>
    </div>
  );
}
