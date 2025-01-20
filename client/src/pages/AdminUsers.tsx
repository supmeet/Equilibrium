// AdminUsersPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
    userId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/user/list`, {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, password, isAdmin, userId } = formData;
    try {
      if (isEditing) {
        await axios.put(
          `${apiUrl}/users/${userId}`,
          {
            firstName,
            lastName,
            email,
            password,
            isAdmin,
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${apiUrl}/users/create`,
          {
            firstName,
            lastName,
            email,
            password,
            isAdmin,
          },
          { withCredentials: true }
        );
      }
      fetchUsers();
      clearForm();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleEdit = (user: any) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "", // Password should be empty when editing
      isAdmin: user.role === "admin",
      userId: user._id,
    });
    setIsEditing(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${apiUrl}/users/${userId}`, {
          withCredentials: true,
        });
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isAdmin: false,
      userId: "",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <label>
          Admin
          <input
            type="checkbox"
            checked={formData.isAdmin}
            onChange={(e) =>
              setFormData({ ...formData, isAdmin: e.target.checked })
            }
          />
        </label>
        <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
        <button type="button" onClick={clearForm}>
          Clear
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isVerified ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Users: {users.length}</p>
    </div>
  );
};

export default AdminUsersPage;
