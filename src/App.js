import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../src/views/Home/Home";
import Order from "../src/views/Guest/Order/Order";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
