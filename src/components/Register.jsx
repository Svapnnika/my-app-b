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
  const handleSubmit = () => {
    const found = users.find((value) => value.email === user.email);
    if (found) {
      setMsg("User already exists!!");
    } else {
      setUsers([...users, user]);
      setMsg();
      Navigate("/");
    }
  };
  const handleDelete = (email) => {
    setUsers(users.filter((value) => value.email !== email));
  };
  return (
    <div className='container'>
      <div>
      <h2>Registration Form</h2>
      <p>{msg}</p>
      <p><input type="text" 
      placeholder='Enter name'
      value={user.name}
      onChange={(e) => setUser({ ...user, name: e.target.value })}
      ></input></p>
      <p><input type="text" 
      placeholder='Email address'
      value={user.email}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      ></input></p>
      <p><input type="password" 
      placeholder='New password'
      value={user.password}
      onChange={(e) => setUser({ ...user, email: e.target.value })}
      ></input></p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <p>
        <Link to="../login">Already a member? Login here!</Link>
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
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((value, index) => (
                  <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.password}</td>
                      <td>
                        <button onClick={() => handleDelete(value.email)}>
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