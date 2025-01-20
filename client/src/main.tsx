import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminPanel";
import AdminUsersPage from "./pages/AdminUsers";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/users" element={<AdminUsersPage />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
