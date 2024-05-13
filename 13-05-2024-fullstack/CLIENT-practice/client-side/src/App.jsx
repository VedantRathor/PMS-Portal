import React, { useEffect, useState } from 'react'
import Nav from './Components/Navbar/Nav'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from 'react-router-dom'
import Project from './Components/Project/Project'
import Home from './Components/Home/Home'
import Tast_Individual from './Components/Task/Task_Individual/Tast_Individual'
import LogIndividual from './Components/Logs/Log-individual/LogIndividual'
import About from './Components/About'
import Notification from './Components/Notification/Notification'
import {io} from 'socket.io-client';
import Login from './Components/Login'
const socket = io('http://localhost:7007');


function App() {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  const [view,setView] = useState(false)
  const parentFunction = () =>{
     setView(!view)
  }
  useEffect( () =>{
    if( auth != null && auth != undefined){
      socket.emit('new-user-connected',{
            user_id : auth.result.user_id
      })      
    }
        
        
        socket.on('new-notification',(data)=>{
          alert(`${data}`)
        })
         return () => {
          socket.disconnect();
        };
  },[socket])
  
  return (
    <div className='my-root '>

      <BrowserRouter>
        <Nav parentFunction={parentFunction}/>
        {/* <input type='file'></input> */}
        <Routes>  
          <Route path='/project' Component={Project}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/Logs' Component={LogIndividual}></Route>
          <Route path='/task' Component={Tast_Individual}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path="/Login" Component={Login} />
        </Routes>
      </BrowserRouter>
   <div style={{visibility : view ? 'visible' : 'hidden' }}><Notification /></div>
    </div>
  )
}

export default App