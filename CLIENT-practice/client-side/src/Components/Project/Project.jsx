import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, useAsyncError, useFetcher } from 'react-router-dom'
import axios from 'axios'
import ProjectDetailContainter from './ProjectDetailContainter'
const localhost = 'http://localhost:7007'

function Project() {
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