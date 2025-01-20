import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AdminHome: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const [masterCounts, setMasterCounts] = useState<any | null>(null);

  useEffect(() => {
    // Retrieve admin details from localStorage
    const storedDetails = localStorage.getItem("adminDetails");
    if (storedDetails) {
      setAdminDetails(JSON.parse(storedDetails));
    } else {
      window.location.href = "/admin/login"; // Redirect if not logged in
    }

    // Fetch master counts
    const fetchMasterCounts = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/masterCounts`);
        setMasterCounts(res.data);
      } catch (error) {
        console.error("Failed to fetch master counts:", error);
      }
    };
    fetchMasterCounts();
  }, []);

  const handleMasterClick = (master: string) => {
    window.location.href = `/admin/${master}`;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
          background: "#f4f4f4",
        }}
      >
        {adminDetails && (
          <>
            <p>First Name: {adminDetails.firstName}</p>
            <p>Last Name: {adminDetails.lastName}</p>
            <p>Email: {adminDetails.email}</p>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
          justifyContent: "center",
        }}
      >
        {masterCounts &&
          Object.keys(masterCounts).map((master) => (
            <div
              key={master}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                width: "150px",
                textAlign: "center",
                cursor: "pointer",
                background: "#fff",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => handleMasterClick(master)}
            >
              <h3>{master.charAt(0).toUpperCase() + master.slice(1)}</h3>
              <p>{masterCounts[master]}</p>
            </div>
          ))}
      </div>

      {/* Placeholder for charts */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Charts Coming Soon...</h2>
      </div>
    </div>
  );
};

export default AdminHome;
