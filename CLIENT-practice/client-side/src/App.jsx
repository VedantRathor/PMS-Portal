import React from 'react'
import Nav from './Components/Navbar/Nav'
import Sidebar from './Components/Sidebar/Sidebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Project from './Components/Project/Project'
import Home from './Components/Home/Home'
import Tast_Individual from './Components/Task/Task_Individual/Tast_Individual'
import LogIndividual from './Components/Logs/Log-individual/LogIndividual'


function App() {
  return (
    <div className='my-root '>

      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/project' Component={Project}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/Logs' Component={LogIndividual}></Route>
          <Route path='/task' Component={Tast_Individual}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App