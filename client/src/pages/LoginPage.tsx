import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/user/login`, formData, {
        withCredentials: true,
      });

      alert(response.data.message);
      navigate("/home"); // Redirect to the user's home page after login
    } catch (error: any) {
      if (error.response?.status === 403) {
        // If email is not verified, redirect to verification page
        alert("Please verify your email.");
        navigate("/verify-email");
      } else {
        setError(error.response?.data?.message || "Login failed.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <p>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </p>
    </form>
  );
};

export default Login;
