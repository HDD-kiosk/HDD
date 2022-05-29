import React, {  Suspense } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Order from "../src/views/Guest/Order/Order";

import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Mode from "./views/Mode/Mode";
import MainGuset from "./views/Guest/Order/MainGuest";
import Manage from "./views/Manage/Manage";
import Confirmorder from "./views/Confirmorder/Confirmorder";


function Router({ isLoggedIn, userObj }) {
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
          <Route path="/order" element={<Order userObj={userObj} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mode" element={<Mode />} />
          <Route path="/mainguest" element={<MainGuset  userObj={userObj}  />} />
          <Route path="/Manage" element={<Manage userObj={userObj} />} />
          <Route path="/confirmorder" element={<Confirmorder />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
