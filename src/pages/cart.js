import React from "react";
import { useCart } from "../cart/cart";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0)
    return (
      <div style={{ padding: 20 }}>
        Your cart is empty. <Link to="/">Go shopping</Link>
      </div>
    );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.img} alt={item.name} />
          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>₹{item.price.toLocaleString()}</p>
            <div>
              Qty:
              <input
                className="qty-input"
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  updateQty(item.id, parseInt(e.target.value || 1))
                }
              />
              <button
                style={{ marginLeft: 8 }}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <h3>Total: ₹{total.toLocaleString()}</h3>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
