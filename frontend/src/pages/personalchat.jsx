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
export default Personalchat;