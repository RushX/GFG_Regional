import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/HeadersFooters/Header";
import Home from "./components/Home";
import About from "./components/About";
import FAQs from "./components/FAQs";
import Signup from "./components/Auth/Signup";
import LoginPage from "./Login";
import DashboardMain from "./components/routes/DashboardMain";
import Verify from "./components/Verify";
export default function App() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/about" element={<><Header /><About /></>} />
        <Route path="/faqs" element={<><Header /><FAQs /></>} />
        <Route path="/login" element={<><Header /><LoginPage /></>} />
        <Route path="verify/" element={<><Verify/></>} />
        <Route path="/signup" element={<><Header /><Signup /></>} />
        <Route path="/dashboard/*" element={<DashboardMain />} />
        
      </Routes>

    </BrowserRouter>
  );
}
