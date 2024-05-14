import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, useAsyncError, useFetcher, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProjectDetailContainter from './ProjectDetailContainter'
const localhost = 'http://localhost:7007'

function Project() {
  const navigate = useNavigate();

  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  if (auth != null && auth != undefined) {
    name = auth.result.name
    role = auth.result.role
  }else{
    localStorage.removeItem('user')
    navigate('/Login')
  }

    const [project_id, setProjectId] = useState() 
    const [logid , setLogId] = useState(false)
    const parentFunction = ( project_id ) => {
        setProjectId(project_id)
        setLogId(false)
    }
    const ReverseLogId = (project_id)=>{
      setProjectId(project_id)
      setLogId(!logid)
    }
      

  return (
    <div className='project-container'>
        <div className='sidebar'>
             <Sidebar ReverseLogId={ReverseLogId} parentFunction = {parentFunction} />
        </div>
        <div className='project-right-container'>
            <ProjectDetailContainter logid={logid} project_id = { project_id }/>
        </div>
    </div>
  )
}

export default Project