import React, { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const [formData, setFormData] = useState({ email: "", verificationCode: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/user/verify-email`, formData);
      alert(res.data.message);
      window.location.href = "login";
    } catch (error: any) {
      alert(error.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="verificationCode"
        placeholder="Verification Code"
        onChange={handleChange}
      />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyEmail;
