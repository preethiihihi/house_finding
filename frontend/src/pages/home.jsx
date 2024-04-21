import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes , useNavigate} from 'react-router-dom'; 
import './style.css'

function Home(props){
     
     const [houses, setHouses]= useState([]);
     const { userId } = useParams();
     const navigate=useNavigate();
     
     
     useEffect(() => {
          axios.get('http://localhost:1290/get/home')
            .then(result => setHouses(result.data))
            .catch(err => console.log("error", err));
        }, []);

        const handleClick=(user2)=>{
          navigate(`/chat/${userId}/${user2}/1`)
      }

   return(
     <>
     <div className="home">
     <h1>i am home {userId}</h1>
     
     <Link to={`/addhome/${userId}`}>Add home</Link>
     <Link to={`/viewhome/${userId}`}>View Home</Link>
     <Link to={`/chats/${userId}`}>Chats</Link>
     {
  houses.length === 0 ? (
    <p>no result</p>
  ) : (
    <div className="houses">
      {houses.map((house, index) => (
        <div key={index} className="house">
          <h1>{house.user}</h1>
          <h2>{house.title}</h2>
          <p>Location: {house.location}</p>
          <p>discription : {house.discription}</p>
          <p>rate : {house.rate}</p>
          <button onClick={()=>handleClick(house.user)}>chat</button>
        </div>
      ))}
    </div>
  )
}

     </div>
     </>
   )
}
export default Home;