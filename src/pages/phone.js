// src/pages/Phones.jsx
import React from "react";
import ProductCard from "../components/productcard";
import { phones } from "../data/products";

export default function Phones() {
  return (
    <>
      <section className="banner">
        <h1>Smartphones Collection</h1>
      </section>

      <section className="categories">
        {phones.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
