/*
import react from 'react'
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes , useNavigate} from 'react-router-dom'; 
import './style.css';

function Personalchat(){
     const { userId, userId2 ,add} = useParams();
     const [sta, setSta]=useState(add);
     const [msgs, setMsgs]= useState([]);
     const [newmsg, setNewmsg]=useState("");
     const navigate= useNavigate();


     const handleSubmit=()=>{
     
          axios.post('http://localhost:1290/chats/create',{user1:userId, user2:userId2, message:newmsg
     ,add:sta})
          .then((res)=>{ if(sta==1) setSta(0);})
          .catch((err)=>console.log(err));
         const newChatMessage={user1:userId, user2:userId2, message:newmsg};
            const updatedMsgs = [...msgs, newChatMessage];
            setMsgs(updatedMsgs); 
            setNewmsg("");
            document.getElementById("chat").value = "";
    
          
         }
    
     useEffect(
          ()=>{
               axios.get(`http://localhost:1290/with/${userId}/${userId2}`)
               .then((response)=>{setMsgs(response.data.results);})
               .catch((err)=>console.log(err));
          },[]
     );
return(
     <>
     <div className="chat-container">
     <div  className="chat-history">
{
     (msgs.length>0)? (
  
          <div className="msg-list">
          {msgs.map((da) => (
            <>
            <div key={da.id}  className="msg-item">{da.user1}, {da.message}</div>
           
            </>
          ))}
        </div>
        
     ) : <p>ntg</p>
}
<div className="chat-input">
              <label htmlFor="chat">chat</label>
              <input name="chat" id="chat" type="text" onChange={(e)=>{setNewmsg(e.target.value)}}/>
              <input type="submit" onClick={handleSubmit}/>
            </div>
      

</div>
</div>
     </>
)
}
*/

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Personalchat() {
  const { userId, userId2, add } = useParams();
  const [sta, setSta] = useState(add);
  const [msgs, setMsgs] = useState([]);
  const [newmsg, setNewmsg] = useState("");
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  let socket;

  useEffect(() => {

    socket = new WebSocket('ws://localhost:1291');

  
    socket.onopen = () => {
      console.log('WebSocket connected');
    }; })

  useEffect(() => {
    // Establish WebSocket connection

    socket.onmessage = (event) => {
     
      //console.log(event.data)
      const message = JSON.parse(event.data);
      //console.log("message ", message)
      //setMsgs((prevMsgs) => [...prevMsgs, message]);
      if ((message.user1 === userId && message.user2 === userId2) ||
          (message.user1 === userId2 && message.user2 === userId)) {
        setMsgs((prevMsgs) => [...prevMsgs, message]);
        // Scroll to the bottom of the chat history
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
    };

    // Fetch chat history using HTTP request initially
    axios.get(`http://localhost:1290/with/${userId}/${userId2}`)
      .then((response) => { setMsgs(response.data.results); 
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      })
      .catch((err) => console.log(err));
      

    return () => {
      socket.close();
    };
  }, [userId, userId2]);

  const handleSubmit = () => {
    const newChatMessage = { user1: userId, user2: userId2, message: newmsg };

    //console.log(newChatMessage);
    socket.send(JSON.stringify(newChatMessage));

    // Update the local state
    axios.post('http://localhost:1290/chats/create',{user1:userId, user2:userId2, message:newmsg
      ,add:sta})
           .then((res)=>{ if(sta==1) setSta(0);})
           .catch((err)=>console.log(err));

    //setMsgs((prevMsgs) => [...prevMsgs, newChatMessage]);
    setNewmsg("");
    document.getElementById("chat").value = "";


  };

  return (
    <>
      <div className="chat-container">
        <div ref={chatContainerRef}  className="chat-history">
          {
            (msgs.length > 0) ? (
              <div className="msg-list">
                {msgs.map((da) => (
                  <div key={da.id} className="msg-item">{da.user1}, {da.message}</div>
                ))}
              </div>
            ) : <p>ntg</p>
          }
          <div className="chat-input">
            <label htmlFor="chat">chat</label>
            <input
              name="chat"
              id="chat"
              type="text"
              value={newmsg}
              onChange={(e) => setNewmsg(e.target.value)}
            />
            <input type="submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Personalchat;


