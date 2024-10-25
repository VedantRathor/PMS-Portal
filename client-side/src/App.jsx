import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client';
import { initSocket, emitEvent, listenEvent, disconnectSocket } from './socket'; 
import Nav from './Components/Navbar/Nav'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Project from './Components/Project/Project'
import Home from './Components/Home/Home'
import Tast_Individual from './Components/Task/Task_Individual/Tast_Individual'
import LogIndividual from './Components/Logs/Log-individual/LogIndividual'
import About from './Components/About'
import Notification from './Components/Notification/Notification'
import Login from './Components/Login'
import AddProject from './Components/Project/AddProject/AddProject'
import AllUsers from './Components/AllUsers/AllUsers'
import AI_interface from './Components/AI-module/AI_interface'
import AI_ASK_GPT from './Components/AI-module/AI_ASK_GPT'
import AttendanceContainer from './Components/AttendanceManagement/AttendanceContainer'

function App() {
    useEffect(() => {
      initSocket(); // Replace with your server URL
  }, []);
  const [view, setView] = useState(false)
  const [isAIdialog, setIsAIdialog] = useState(false)
  const [isAIGPTdialog, setIsAIGPTdialog] = useState(false)
  const [flag, setFlag] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loadNotification, setloadNotification] = useState(false)

  const [isDesktop, setIsDesktop] = useState(true); // To track screen size

  // Function to handle notification visibility
  const parentFunction = () => {
    if (view === false) {
      setloadNotification(true)
      setRefresh(!refresh)
    } else {
      setloadNotification(false)
    }
    setView(!view)
  }

  // Function to toggle AI Dialog box
  const toggleAIDialogBox = (close) => {
    setIsAIdialog(!isAIdialog)
    if (close === true) {
      setIsAIdialog(false)
    }
  }

  const toggleAIGPTIDalogBox = (close) => {
    setIsAIGPTdialog(!isAIdialog)
    if (close === true) {
      setIsAIGPTdialog(false)
    }
  }

  const changeFlag = () => {
    setFlag(!flag)
  }

  // UseEffect to check for screen resolution
  useEffect(() => {
    const checkResolution = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setIsDesktop(false); // Set to false if screen width is below 1024px
        alert('Please run this application on a laptop or desktop resolution.');
      } else {
        setIsDesktop(true);
      }
    };

    // Run the check on initial load
    checkResolution();

    // Add resize event listener to check if window is resized
    window.addEventListener('resize', checkResolution);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkResolution);
    };
  }, []);

  // If screen size is not desktop, display a message instead of the app
  if (!isDesktop) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Mobile and Tablet versions are not supported.</h1>
        <p>Please use a laptop or desktop to access this application.</p>
      </div>
    );
  }

  return (
    <div className='my-root'>
      <BrowserRouter>
        <Nav changeFlag={changeFlag} parentFunction={parentFunction} toggleAIDialogBox={toggleAIDialogBox} toggleAIGPTIDalogBox={toggleAIGPTIDalogBox} />
        <Routes>
          <Route path='/project' Component={Project}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/Logs' Component={LogIndividual}></Route>
          <Route path='/task' Component={Tast_Individual}></Route>
          <Route path='/about' Component={About}></Route>
          <Route path="/login" element={<Login changeFlag={changeFlag} />} />
          <Route path="/add-new-project" Component={AddProject} />
          <Route path="/All-Users" Component={AllUsers} />
          <Route path="/attendance-portal" Component={AttendanceContainer} />
        </Routes>
      </BrowserRouter>
      <div style={{ visibility: view ? 'visible' : 'hidden' }}><Notification refresh={refresh} loadNotification={loadNotification} view={view} /></div>
      <div style={{ visibility: isAIdialog ? 'visible' : 'hidden' }}><AI_interface toggleAIDialogBox={toggleAIDialogBox} /></div>
      <div style={{ visibility: isAIGPTdialog ? 'visible' : 'hidden' }}><AI_ASK_GPT toggleAIGPTIDalogBox={toggleAIGPTIDalogBox} /></div>
    </div>
  )
}

export default App;
