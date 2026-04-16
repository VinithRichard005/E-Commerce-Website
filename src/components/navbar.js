// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cart/cart";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  // Listen for login/logout events from other components
  useEffect(() => {
    function handleStorageChange() {
      setUsername(localStorage.getItem("username") || "");
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (!confirmed) return;

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setUsername("");
    navigate("/");
  }

  // Get initials from username (e.g. "Vinith Richard" → "VR")
  function getInitials(name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: "#ff9900", textDecoration: "none" }}>
          Kaadugal
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Cart always comes first */}
        <Link to="/cart">
          Cart 🛒 ({count})
        </Link>

        {/* Sign In / User info on the right */}
        {username ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Avatar circle with initials */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff9900, #ff6600)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "700",
                fontSize: "14px",
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(255,153,0,0.5)",
              }}
            >
              {getInitials(username)}
            </div>
            {/* Username */}
            <span style={{ color: "var(--text)", fontWeight: "600", fontSize: "14px" }}>
              {username}
            </span>
            {/* Logout button */}
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid #ff4444",
                color: "#ff4444",
                padding: "4px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </header>
  );
}
