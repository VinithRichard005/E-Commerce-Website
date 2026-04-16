import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignUp() {
    if (!username || !phone || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Call the backend API to store the user
    const result = await registerUser({ username, phone, email, password });
    
    if (result.success) {
      // Temporarily mark as authenticated
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
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
      <div className="checkout-form" style={{ width: 450, maxWidth: "100%", margin: "0 auto" }}>
        <h2>Create Account</h2>
        <input
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
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
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>
          Sign Up
        </button>
        {error && <p style={{ color: "#ef4444", textAlign: "center", marginTop: "16px", fontWeight: "600" }}>{error}</p>}
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <span style={{ color: "var(--text-muted)" }}>Already have an account? </span>
          <Link to="/signin" style={{ color: "var(--primaryHover)", textDecoration: "none", fontWeight: "600" }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
}
