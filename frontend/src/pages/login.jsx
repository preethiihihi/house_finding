import { useState } from "react";
import React from 'react';
import axios from 'axios';
import './style.css';

import { BrowserRouter as Router, Route, Link, Routes , useNavigate} from 'react-router-dom'; 

function Login(props){
     const [user,setUser]=useState("");
     const [pass,setPass]=useState("");
     const [msg,setMsg]=useState("");
     const navigate = useNavigate();

     const handleclick=()=>{
          axios.post('http://localhost:1290/login', { user: user, passw: pass })
          .then((result) => {
            if (result.data.msg === true) {
              navigate(`/home/${user}`);
            } else{
               setMsg(result.data.msg);
            }
          })
          .catch(err => console.log(err));
     }
     
     return(
          <>
          <div className="login">
               <h2>Login</h2>
          <label htmlFor="user">Username</label>
          <br/>
          <input type="text" name="user" id="user" onChange={event=>setUser(event.target.value)}/>
          <br/>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="text" name="password" id="password" onChange={event=>setPass(event.target.value)}/>
          <br/>
          <input type="submit" name="submit" onClick={handleclick}/>
       
    
        <Link to="/register">Register</Link>
         <p>{msg}</p>
         </div>



          </>
     );
}

export default Login;