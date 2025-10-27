// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/cart";

export default function Navbar() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);

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
      <div className="nav-links">
        <Link to="/signin">Sign In</Link>
        <Link to="/cart" style={{ marginLeft: 12 }}>
          Cart 🛒 ({count})
        </Link>
      </div>
    </header>
  );
}
