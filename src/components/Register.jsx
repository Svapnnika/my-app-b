import React from 'react'
import { Link } from 'react-router-dom'
export default function Register() {
  return (
    <div>
      <h2>Registration Form</h2>
      <p><input type="text" placeholder='Enter name'></input></p>
      <p><input type="text" placeholder='Email address'></input></p>
      <p><input type="password" placeholder='New password'></input></p>
      <p><button>Submit</button></p>
      <p>
        <Link to="../login">Already a member? Log In</Link>
      </p>
    </div>
  )
}