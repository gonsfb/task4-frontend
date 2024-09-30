import React, { useEffect, useState } from 'react';
import api from '../services/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faTrash } from '@fortawesome/free-solid-svg-icons';


const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleBlockUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map((userId) => api.patch(`/users/${userId}/block`))
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, status: 'blocked' } : user
        )
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error blocking users:', error);
    }
  };

  const handleUnblockUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map((userId) => api.patch(`/users/${userId}/unblock`))
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
        )
      );
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error unblocking users:', error);
    }
  };

  const handleDeleteUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map((userId) => api.delete(`/users/${userId}`))
      );
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      <div className="mb-3">
        <button className="btn btn-danger me-2" onClick={handleBlockUsers} disabled={selectedUsers.length === 0}>
          Block
        </button>
        <button className="btn btn-success me-2" onClick={handleUnblockUsers} disabled={selectedUsers.length === 0}>
         <FontAwesomeIcon icon={faUnlock} />
        </button>
        <button className="btn btn-warning" onClick={handleDeleteUsers} disabled={selectedUsers.length === 0}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length && users.length > 0}
                onChange={handleSelectAllUsers}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last Login</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.last_login || 'Never'}</td>
              <td>{user.registration_time}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;

