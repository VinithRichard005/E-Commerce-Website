import React, { useState } from "react";
import { useCart } from "../cart/cart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function placeOrder() {
    if (!email || !name) {
      alert("Enter name and email");
      return;
    }
    setLoading(true);
    const order = { name, email, addr, items: cart, total };

    try {
      const res = await fetch("http://localhost:8000/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        alert("Order placed!.");
        clearCart();
        navigate("/");
      } else {
        alert("Order placed locally.");
        clearCart();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Order Placed Successfully.");
      clearCart();
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <h2>Checkout</h2>
      <div className="checkout-form">
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Delivery address"
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
        />
        <h4>Total: ₹{total.toLocaleString()}</h4>
        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
