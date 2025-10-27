// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../cart/cart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="category-card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price.toLocaleString()}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
