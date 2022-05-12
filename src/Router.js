import React, { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../src/views/Home/Home";
import Order from "../src/views/Guest/Order/Order";
import Payment from "../src/views/Guest/Order/Payment";

import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Mode from "./views/Mode/Mode";

import firebase, { authService } from "./firebase";

function Router({ isLoggedIn }) {
  //
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Mode />} />
            </>
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mode" element={<Mode />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
