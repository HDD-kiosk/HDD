import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "../src/views/Home/Home";
import Order from "../src/views/Guest/Order/Order";
import Payment from "../src/views/Guest/Order/Payment";

import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Mode from "./views/Mode/Mode";
import VoiceOrder from "./views/Guest/Order/VoiceOrder";
import MainGuest from "./views/Guest/Order/MainGuest";
import Manage from "./views/Manage/Manage";
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mode" element={<Mode />} />
          <Route path="/voiceorder" element={<VoiceOrder />} />
          <Route path="/mainguest" element={<MainGuest />} />
          <Route path="/Manage" element={<Manage />} />

        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
