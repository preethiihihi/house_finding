import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Personalchat from './personalchat';
import { BrowserRouter as Router, Route, Link, Routes , useNavigate} from 'react-router-dom'; 
import './style.css';


function Chats(props){
     const [data, setData]=useState([]);
     const { userId } = useParams();
     const [msgs, setMsgs]= useState([]);
     
     const userp=userId; 
     const [user22,setUser22]=useState("");
     const navigate=useNavigate();
     
     
     useEffect(
          ()=>{
          axios.get(`http://localhost:1290/chats/with/${userp}` )
          .then((resp)=>{setData(resp.data.chats); })
          .catch((err)=>console.log(err));
          },[]
     );
     const handleclick=(user2)=>{
              navigate(`/chat/${userp}/${user2}/0`);
     }
     
    
     
     return(
<>
<div classnmae="chat"> 
<h2>{userId}</h2>
{
     (data)? (

    ( data.length === 0) ? (
     <p>no results</p>
   ) : (
     <div className="chat-list">
       {data.map((da, index) => (
         <div key={index} onClick={()=>handleclick(da)} className="chat-item">{da}</div>
       ))}
     </div>
   ) ) : <p>null</p>
}
</div>
</>
     );
}
export default Chats;