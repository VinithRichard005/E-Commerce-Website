import React from "react";
import ProductCard from "../components/productcard";
import { fashion } from "../data/products";

export default function Fashion() {
  return (
    <>
      <section className="banner">
        <h1>Fashion Collection</h1>
      </section>

      <section className="categories">
        {fashion.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
