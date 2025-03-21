import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"
export default function Register() {
  const [details, setDetails] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    const newDetails = {
      name: name,
      email: email,
      password: password
    };
    setDetails([...details, newDetails]);
    setName("");
    setEmail("");
    setPassword("");
  }
  
  return (
    <div className='container'>
      <div>
      <h2>Registration Form</h2>
      <p><input type="text" 
      placeholder='Enter name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      ></input></p>
      <p><input type="text" 
      placeholder='Email address'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      ></input></p>
      <p><input type="password" 
      placeholder='New password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      ></input></p>
      <p>
        <button onClick={handleSubmit}>Submit</button>
      </p>
      <p>
        <Link to="../login">Already a member? Log In</Link>
      </p>
      </div>
      <div>
        <h3>Details Entered</h3>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {details.length > 0 &&
              details.map((detail, index) => (
                  <tr key={index}>
                      <td>{detail.name}</td>
                      <td>{detail.email}</td>
                      <td>{detail.password}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}