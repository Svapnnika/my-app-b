import React from "react";
import { Link } from "react-router-dom";
import { appContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const {user, setUser, users, setUsers, cart} = useContext(appContext);
  const Navigate = useNavigate();
  const [msg, setMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!user.email || !user.password) {
      setMsg("Please fill in all fields");
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
    setMsg("");
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const found = users.find(
        (value) => value.email === user.email && value.password === user.password
      );
      
      if (found) {
        setMsg("Login successful! Redirecting...");
        setTimeout(() => {
          Object.keys(cart).length > 0 ? Navigate("/cart") : Navigate("/");
        }, 1000);
      } else {
        setMsg("Invalid email or password. Please try again.");
      }
      
      setIsLoading(false);
    }, 500);
  };
  return (
    <div style={{ color: 'white', backgroundColor: 'black', padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login Form</h2>
      
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
          type="email" 
          placeholder="Email address"
          value={user.email || ''}
          onChange={(e) => setUser({...user, email: e.target.value})}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          disabled={isLoading}
        />
      </p>
      
      <p>
        <input 
          type="password" 
          placeholder="Password"
          value={user.password || ''}
          onChange={(e) => setUser({...user, password: e.target.value})}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          disabled={isLoading}
        />
      </p>
      
      <p>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: isLoading ? '#666' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </p>
      
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="../register" style={{ color: '#007bff', textDecoration: 'none' }}>
          New User? Register Here!
        </Link>
      </p>
    </div>
  );
}