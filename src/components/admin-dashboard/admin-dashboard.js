import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin-dashboard.css";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";

function AdminDashBoard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // ----------------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    navigate("/login");
  };

  // --------------------------------------------------------------------------
  const UpdateUserRole = async (id, currentRole) => {
    try {
      const updatedRole = currentRole === "user" ? "admin" : "user"; // Toggle the role

      const response = await axios.put(
        `http://localhost:3000/admin/updateRole`,
        { role: updatedRole, userId: id } // Pass role and userId in the body
      );

      // Update role in the local data
      const updatedData = data.map((user) =>
        user._id === id ? { ...user, role: updatedRole } : user
      );

      setData(updatedData);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  // ----------------------------------------------------------------------------
  const UpdateUserStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the boolean status

      const response = await axios.put(
        `http://localhost:3000/admin/updateStatus`,
        { is_active: updatedStatus, userId: id } // Pass isActive and userId in the body
      );

      // Update status in the local data
      const updatedData = data.map((user) =>
        user._id === id ? { ...user, isActive: updatedStatus } : user
      );

      setData(updatedData);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  // ----------------------------------------------------------------------------
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/deleteUser/${id}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage or wherever you store it
      if (!token) {
        setTokenMissing(true);
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(
        `http://localhost:3000/admin/getUsersList`
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Pagination logic ...
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  
  return (
    <div>
      {tokenMissing ? (
        <div className="error-message">
          <p>You need to log in to access the dashboard.</p>
          <button onClick={() => navigate("/login")}>Log In</button>
        </div>
      ) : (
        <div className="dashboard">
          <Table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Is Active?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele.username}</td>
                  <td>{ele.email}</td>
                  <td>
                    <button onClick={() => UpdateUserRole(ele._id, ele.role)}>
                      {ele.role === "user" ? "Make Admin" : "Revoke Admin"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => UpdateUserStatus(ele._id, ele.isActive)}
                    >
                      {ele.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                  <td>
                    <a onClick={() => deleteUser(ele._id)}>
                      <i className="far fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination buttons ... */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastUser >= data.length}
            >
              Next
            </button>
          </div>

          <button className="mt-5" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
