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
import { io } from 'socket.io-client';
import Login from './Components/Login'
import axios from 'axios'
import AddProject from './Components/Project/AddProject/AddProject'
const socket = io('http://localhost:7007');


function App() {

  const [view, setView] = useState(false)
  
  const [flag, setFlag] = useState(false)
  const [refresh,setRefresh] = useState(false)

  const [loadNotification, setloadNotification] = useState(false) 
  const parentFunction = () => {
    if( view == false ){
     setloadNotification(true)
     setRefresh(!refresh)
    }else{
      setloadNotification(false)
    }
    setView(!view)
  }
  const changeFlag = () => {
    setFlag(!flag) ;
  }
  useEffect(() => {
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    if (auth != null && auth != undefined) {
      socket.emit('new-user-connected', auth.result.user_id);
      socket.on('render-my-notification', (user_id) => {
        //this is always called! 
        if( user_id == auth.result.user_id ){
          // render the notification ! 
          setloadNotification(true) ;
          setRefresh(!refresh) ;
        }
      });
      socket.on('alert',(data)=>{
        alert(`${data}`)
      })

    }
  }, [socket, flag])

  return (
    <div className='my-root '>

      <BrowserRouter>
        <Nav changeFlag={changeFlag} parentFunction={parentFunction} />
        {/* <input type='file'></input> */}
        <Routes >
          <Route path='/project'  Component={Project}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/Logs' Component={LogIndividual}></Route>
          <Route path='/task' Component={Tast_Individual}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path="/login" element={<Login changeFlag={changeFlag} />} />
          <Route path="/add-new-project" Component={AddProject}/>
        </Routes>
      </BrowserRouter>
      <div  style={{ visibility: view ? 'visible' : 'hidden' }}><Notification refresh={refresh} loadNotification={loadNotification} view={view} /></div>
    </div>
  )
}

export default App