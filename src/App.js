// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./cart/cart";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Phones from "./pages/phone";
import Laptops from "./pages/laptop";
import Appliances from "./pages/appliance";
import Fashion from "./pages/fashion";
import CartPage from "./pages/cart";
import Checkout from "./pages/order";
import SignIn from "./pages/signin";

import "./home.css";

function App() {
  return (
    <CartProvider>
      {/* 🚨 Important for Deployed URL to Work */}
      <Router basename="/E-Commerce-Website">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/appliances" element={<Appliances />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Prevents NO ROUTE MATCHING & Blank Screen */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
