import React from "react";
import ProductCard from "../components/productcard";
import { laptops } from "../data/products";

export default function Laptops() {
  return (
    <>
      <section className="banner">
        <h1>Laptops Collection</h1>
      </section>
      <section className="categories">
        {laptops.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
