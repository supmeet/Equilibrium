import React, { useEffect, useState } from "react";

const handleLogout = () => {
  localStorage.removeItem("adminDetails");
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "/admin/login";
};

const AdminHome: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Retrieve admin details from localStorage
    const storedDetails = localStorage.getItem("adminDetails");
    if (storedDetails) {
      setAdminDetails(JSON.parse(storedDetails));
    } else {
      // Handle the case when user details are not found
      window.location.href = "/admin/login"; // Redirect to login if not logged in
    }
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>
      {adminDetails ? (
        <div>
          <p>First Name: {adminDetails.firstName}</p>
          <p>Last Name: {adminDetails.lastName}</p>
          <p>Email: {adminDetails.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminHome;
