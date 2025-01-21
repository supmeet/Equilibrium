import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/admin/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.token) {
        localStorage.setItem("adminDetails", JSON.stringify(res.data.user));
        // document.cookie = `jwt=${res.data.token}`;
        // alert("Admin login successful!");
        window.location.href = "/admin/home";
      }
    } catch (error) {
      alert("Admin login failed.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
