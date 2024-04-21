import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import './style.css';

function Register(){
     const [user,setUser]=useState("");
     const [pass,setPass]=useState("");
     const [msg, setMsg]=useState("");
     const handleclick=()=>{
          axios.post('http://localhost:1290/register',{user:user, passw:pass})
          .then(result=>setMsg(result.data.msg))
          .catch(err=>console.log(err));
            }
return(
     <>
<div className="register">
     <h1>Register </h1>
          <label htmlFor="user">Username</label>
          <br/>
          <input type="text" name="user" id="user" onChange={event=>setUser(event.target.value)}/>
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="text" name="password" id="password" onChange={event=>setPass(event.target.value)}/>
          <br/>
          <input type="submit" name="submit" onClick={handleclick}/>
          <Link to="/">login</Link>
         <p>{msg}</p>
         </div>
     </>
)
}
export default Register;