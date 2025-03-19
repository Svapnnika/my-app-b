import React from "react";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div>
      <h2>Login Form</h2>

      <p>
        <input type="text" placeholder="Email address"></input>
      </p>
      <p>
        <input type="password" placeholder="Password"></input>
      </p>
      <p>
        <button>Log In</button>
      </p>
      <p>
        <Link to="../register">New User Register Here!</Link>
      </p>
    </div>
  );
}