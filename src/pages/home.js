// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="banner">
        <h1>Big Sale - Up to 50% Off!</h1>
      </section>

      <section className="categories">
        <div className="category-card">
          <img src="/images/phones.webp" alt="Smartphones" />
          <h3>Smartphones</h3>
          <Link to="/phones">Shop Now</Link>
        </div>
        <div className="category-card">
          <img src="/images/laptop.jpg" alt="Laptops" />
          <h3>Laptops</h3>
          <Link to="/laptops">Shop Now</Link>
        </div>
        <div className="category-card">
          <img src="/images/appliance.jpg" alt="Appliances" />
          <h3>Appliances</h3>
          <Link to="/appliances">Shop Now</Link>
        </div>
        <div className="category-card">
          <img src="/images/dress.jpg" alt="Fashion" />
          <h3>Fashion</h3>
          <Link to="/fashion">Shop Now</Link>
        </div>
      </section>
    </>
  );
}
