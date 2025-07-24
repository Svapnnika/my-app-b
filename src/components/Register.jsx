import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { useState } from "react";
import "./Register.css"
import { useContext } from "react";
import { appContext } from "../App";
export default function Register() {
  const { user, setUser, users, setUsers } = useContext(appContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = () => {
    if (!user.name || !user.email || !user.password) {
      setMsg("Please fill in all fields");
      return false;
    }
    
    if (user.name.length < 2) {
      setMsg("Name must be at least 2 characters long");
      return false;
    }
    
    if (!isValidEmail(user.email)) {
      setMsg("Please enter a valid email address");
      return false;
    }
    
    if (user.password.length < 6) {
      setMsg("Password must be at least 6 characters long");
      return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    // Clear previous messages
    setMsg("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    const found = users.find((value) => value.email === user.email);
    if (found) {
      setMsg("User already exists with this email!");
    } else {
      setUsers([...users, user]);
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    }
  };
  const handleDelete = (email) => {
    setUsers(users.filter((value) => value.email !== email));
  };
  return (
    <div className='container'>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Registration Form</h2>
      
      {msg && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '15px', 
          borderRadius: '4px',
          backgroundColor: msg.includes('successful') ? '#4CAF50' : '#f44336',
          color: 'white'
        }}>
          {msg}
        </div>
      )}
      
      <p>
        <input 
          type="text" 
          placeholder='Enter name (min 2 characters)'
          value={user.name || ''}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </p>
      
      <p>
        <input 
          type="email" 
          placeholder='Email address'
          value={user.email || ''}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </p>
      
      <p>
        <input 
          type="password" 
          placeholder='Password (min 6 characters)'
          value={user.password || ''}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </p>
      
      <p>
        <button 
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Register
        </button>
      </p>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="../login" style={{ color: '#007bff', textDecoration: 'none' }}>
          Already a member? Login here!
        </Link>
      </p>
      </div>
      <div>
        <h3>Users Registered</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((value, index) => (
                  <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(value.email)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}