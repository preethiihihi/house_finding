import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import './pages/style.css';
import AddHome from './pages/addHome';
import ViewHome from './pages/viewHome';
import Chats from './pages/chats';
import Personalchat from './pages/personalchat';



function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState("");
  const useris=(name)=>{
   setUser(name);
  }

  return (
    <>
     <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/:userId" element={<Home />}/>
          <Route path="/addhome/:userId" element={<AddHome />}/>
          <Route path="/viewhome/:userId" element={< ViewHome />}/>
          <Route path="/chats/:userId" element={<Chats />} />
          <Route path="chat/:userId/:userId2/:add" element={<Personalchat />} />
          
        </Routes>
      </div>
    </Router>
  
  
  
   </>
  );
}

export default App
