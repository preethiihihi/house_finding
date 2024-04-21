import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css'

function AddHome(props){
     const [title, setTitle]= useState("");
     const [location, setLocation]= useState("");
     const [discription, setDiscription]= useState("");
     const [rate, setRate]= useState("");
     const { userId } = useParams();

     const handleSubmit=()=>{
          axios.post('http://localhost:1290/addhome',{
               user:userId,
               title:title,
               location:location,
               discription:discription,
               rate: rate
          }).then(()=>{ window.location.reload();
} )
          .catch((err)=>{console.log(err)})
     }
return(
     <>
     <div className="addhome">
     <label htmlFor='title'> title</label>
     <input type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)}/>
     <label htmlFor='location'> location</label>
     <input type="text" name="location" id="location" onChange={(e)=>setLocation(e.target.value)}/>
     <label htmlFor='discription'> discription</label>
     <input type="text" name="discription" id="discription" onChange={(e)=>setDiscription(e.target.value)}/>
     <label htmlFor='rate'> rate</label>
     <input type="number" name="rate" id="rate" onChange={(e)=>setRate(e.target.value)}/>

     <input type="submit" onClick={handleSubmit}/>
     </div>
     </>
)
}

export default AddHome;