import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import Chart.js
import 'chart.js/auto'; // Required for Chart.js v3+
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeSection, setActiveSection] = useState('skills'); // Manage active section state
  const [activeView, setActiveView] = useState('table'); // To toggle between table and graph views

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsResponse = await axios.get('http://localhost:8800/api/skills');
        const usersResponse = await axios.get('http://localhost:8800/api/auth/admin/users');
        setSkills(skillsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  // Prepare data for the Bar Chart
  const skillNames = skills.map(skill => skill.profileName);
  const skillCount = skills.map(skill => skill.skillCategory.length); // Assuming skill category length for demo
  
  const chartData = {
    labels: skillNames,
    datasets: [
      {
        label: 'Skill Count',
        data: skillCount,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button
          className={`sidebar-button ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </button>
        <button
          className={`sidebar-button ${activeSection === 'users' ? 'active' : ''}`}
          onClick={() => setActiveSection('users')}
        >
          Users
        </button>
        <button
          className={`sidebar-button ${activeView === 'table' ? 'active' : ''}`}
          onClick={() => setActiveView('table')}
        >
          Table View
        </button>
        <button
          className={`sidebar-button ${activeView === 'graph' ? 'active' : ''}`}
          onClick={() => setActiveView('graph')}
        >
          Graph View
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Show Table View or Graph View based on the activeView state */}
        {activeView === 'table' && (
          <>
            {activeSection === 'skills' && (
              <section className="dashboard-section">
                <h2>Skills</h2>
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Profile Picture</th>
                      <th>Profile Name</th>
                      <th>Skill Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map(skill => (
                      <tr key={skill._id}>
                        <td>
                          {skill.profilePicture ? (
                            <img
                              src={`http://localhost:8800${skill.profilePicture}`}
                              alt="Profile"
                              className="profile-picture"
                            />
                          ) : (
                            <p>No picture</p>
                          )}
                        </td>
                        <td>{skill.profileName}</td>
                        <td>{skill.skillCategory}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activeSection === 'users' && (
              <section className="dashboard-section">
                <h2>Users</h2>
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </>
        )}

        {/* Graph View */}
        {activeView === 'graph' && (
          <section className="dashboard-section">
            <h2>Skills Chart</h2>
            <div className="chart-container">
              <Bar data={chartData} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
