import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function login() {
    if (u === "Abcd" && p === "123456789") {
      navigate("/");
    } else {
      setErr("Invalid Username or Password");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{ width: 320, padding: 20, background: "#fff", borderRadius: 8 }}
      >
        <h3>Sign In</h3>
        <input
          placeholder="Username"
          value={u}
          onChange={(e) => setU(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
        />
        <button onClick={login} style={{ marginTop: 10 }}>
          Login
        </button>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </div>
    </div>
  );
}
