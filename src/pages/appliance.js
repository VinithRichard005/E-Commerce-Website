import React from "react";
import ProductCard from "../components/productcard";
import { appliances } from "../data/products";

export default function Appliances() {
  return (
    <>
      <section className="banner">
        <h1>Home Appliances Collection</h1>
      </section>

      <section className="categories">
        {appliances.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>
    </>
  );
}
