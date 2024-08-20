import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Navigate, useAsyncError, useFetcher, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProjectDetailContainter from './ProjectDetailContainter'
import ProjectInfo from './ProjectInfo'
const localhost = 'http://localhost:7007'

function Project() {
  const navigate = useNavigate();

  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  useEffect(()=>{
    if (auth != null && auth != undefined) {
        name = auth.result.name
        role = auth.result.role
      }else{
         
          localStorage.removeItem('user')
          navigate('/login')
      }
      const navigateToProject = () => {
          navigate('/project')
      }
},[])

    const [project_id, setProjectId] = useState() 
    const [logid , setLogId] = useState(false);
    const [navigateTask,setNavigateTask] = useState(false) ;
    const [openMember,setOpenMember] = useState(false) ; 

    const parentFunction = ( project_id ) => {
        setProjectId(project_id);   
        setLogId(false);
    }
  
    const AddTaskFORMVisibility = (view) =>{
      setNavigateTask(!navigateTask)
      if( view != undefined && view != null ){
        setNavigateTask(false) 
      }
    }

    const OpenMember = (view) =>{
      setOpenMember(!openMember)
      if( view != undefined && view != null ){
        setOpenMember(false) 
      }
    }


    const ReverseLogId = (project_id)=>{
      setProjectId(project_id);
      setNavigateTask(false);
      setOpenMember(false);
      setLogId(!logid);
    }
      

  return (
    <div className='project-container'>
      
        <div className='sidebar'>
             <Sidebar OpenMember={OpenMember} AddTaskFORMVisibility={AddTaskFORMVisibility} ReverseLogId={ReverseLogId} parentFunction = {parentFunction} />
        </div>
        <div className='project-right-container'>
      
            <ProjectDetailContainter OpenMember={OpenMember} openMember ={openMember} AddTaskFORMVisibility={AddTaskFORMVisibility} navigateTask={navigateTask} logid={logid} project_id = { project_id }/>
        </div>
    </div>
  )
}

export default Project