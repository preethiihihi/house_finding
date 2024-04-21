import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes , useNavigate} from 'react-router-dom'; 
import './style.css';

function ViewHome(props){
    const [myHomes, setMyHomes]=useState([]);
    const { userId } = useParams();
    const navigate=useNavigate();
    useEffect(()=>{
     axios.post('http://localhost:1290/home/mine', {user:userId})
     .then((result)=>setMyHomes(result.data))
     .catch((err)=>console.log(err))
    },[]);
  const handledelete=(user_id)=>{
    axios.post('http://localhost:1290/deletehome',{id:user_id})
    .then(()=>{  window.location.reload();})
    .catch((err)=>{console.log(err)});
  }
    return(
<>
<div className="viewhome">
 <h2>hello {userId}</h2>
{
     myHomes.length===0? <p>no records</p>
     :
     (
          <div className="homes-container">
               {myHomes.map((house, index) => (
        <div key={index} className="home-card">
          <p>{house._id}</p>
          <h3>{house.user}</h3>
          <h2>{house.title}</h2>
          <p>Location: {house.location}</p>
          <button id="delete" onClick={()=>{handledelete(house._id)}}>delete</button>
         
        </div>
      ))}
          </div>
     )
}
</div>
</>
    );
}

export default ViewHome;