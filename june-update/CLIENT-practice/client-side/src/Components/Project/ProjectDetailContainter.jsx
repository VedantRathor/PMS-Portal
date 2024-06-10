import React from 'react'
import ProjectInfo from './ProjectInfo'
import { useEffect, useState } from 'react'
import { Navigate, useAsyncError, useFetcher, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Task from '../Task/Task'
import ProjectMembers from './ProjectMembers'
import Display from '../Display'
import LogData from '../Logs/LogData'
import TaskForm from '../Task/TaskForm'
import AddMembers from './AddMembers'

const localhost = 'http://localhost:7007'

function ProjectDetailContainter({ project_id,logid,navigateTask, AddTaskFORMVisibility,OpenMember,openMember}) {
  
  const navigate = useNavigate()
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
  
  const [singleProjectData, setSingleProjectData] = useState()
  const [logData,setLogData] = useState()
  const [taskData, setTaskData] = useState()
  const [projectMembers,setProjectMember] = useState() 
  const [eachTask,setEachTask] = useState()
  const [displayData,setDisplayData] = useState('') 
  const [flag,setFlag] = useState(false) ; 
  const [refresh,setRefresh] = useState(false) ;

  const RefreshMe = () =>{
    setRefresh(!refresh)
  }

  const parentFunctionDisplayData = (details='',eachTask)=>{
             setDisplayData(details)
             setEachTask(eachTask)
             setFlag(!flag)
  }
  useEffect(() => {
    const getSingleProjectData = async () => {
      if (project_id != null) {
        const response = await axios.get(`${localhost}/project-details-project/${project_id}`)
        const result = await response.data
        setSingleProjectData(result.result[0])
       
      }
    }

    getSingleProjectData()

  }, [project_id])
  if( navigateTask ){
    localStorage.setItem('projectDetail',JSON.stringify(singleProjectData));
    
  }

  useEffect(() => {
    const getTaskDataByProjectId = async () => {
      const response = await axios.get(`${localhost}/project-details-task/${project_id}`, {
        headers: {
          'Authorization': `Bearer ${auth.result.token}`
        }
      })
      const result = await response.data
      setTaskData(result.result[0].tasks)
      
    }
    getTaskDataByProjectId()
  }, [project_id,refresh])

   useEffect(()=>{
    const getProjectMembers = async()=>{
      if( project_id != null ){
        const response = await axios.get(`${localhost}/project-details-members/${project_id}`)
        const result = await response.data 
        setProjectMember(result.result[0].assignments)
        console.log(projectMembers)
      }
      
    }   
    getProjectMembers()
   },[project_id,refresh])

   useEffect(()=>{
    const getLogByProjectId = async()=>{
      if( logid == true ){
        const response = await axios.get(`${localhost}/project-details-log/${project_id}`)
        const result = await response.data 
        setLogData(result.result[0].tasks)
      
      }
    }
    getLogByProjectId()
   },[logid])
  return (
    <>
   {navigateTask ? <div><TaskForm RefreshMe={RefreshMe} project_id={project_id} AddTaskFORMVisibility={AddTaskFORMVisibility}/></div> :<></>} 
   {openMember ? <div><AddMembers RefreshMe={RefreshMe} project_id={project_id} OpenMember={OpenMember}/></div> : <></>}
    <div className='display' style={{color:'white',visibility: flag ? 'visible' : 'hidden'}}>
      <Display eachTask={eachTask} parentFunctionDisplayData={parentFunctionDisplayData} details={displayData} />
    </div>
      <ProjectInfo parentFunctionDisplayData={parentFunctionDisplayData} singleProjectData={singleProjectData} />
      { logid == true && logData ? 
        <>
           <div className='task-and-members'>
          <div className='task-container'>
              <LogData parentFunctionDisplayData={parentFunctionDisplayData} logData={logData} />
          </div>
          </div>
        </> 
      : taskData && taskData.length!=0 ?
        <div className='task-and-members'>
          <div className='task-container'>
            <Task parentFunctionDisplayData={parentFunctionDisplayData} taskData={taskData}/>
            { projectMembers && projectMembers.length!=0 ? < ProjectMembers projectMembers={projectMembers}/>: <></>}
          </div>
     
        </div>
        : <>No Data Available</>}
      

    </>
  )
}

export default ProjectDetailContainter