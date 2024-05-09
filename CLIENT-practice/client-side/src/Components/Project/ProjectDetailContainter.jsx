import React from 'react'
import ProjectInfo from './ProjectInfo'
import { useEffect, useState } from 'react'
import { Navigate, useAsyncError, useFetcher } from 'react-router-dom'
import axios from 'axios'
import Task from '../Task/Task'
import ProjectMembers from './ProjectMembers'
import Display from '../Display'
import LogData from '../Logs/LogData'

const localhost = 'http://localhost:7007'

function ProjectDetailContainter({ project_id,logid}) {
  const [singleProjectData, setSingleProjectData] = useState()
  const [logData,setLogData] = useState()
  const [taskData, setTaskData] = useState()
  const [projectMembers,setProjectMember] = useState() 
  const [eachTask,setEachTask] = useState()
  const [displayData,setDisplayData] = useState('') 
  const [flag,setFlag] = useState(false)
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

  useEffect(() => {
    const getTaskDataByProjectId = async () => {
      const response = await axios.get(`${localhost}/project-details-task/${project_id}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkyNDg3NiwiZXhwIjoxNzE1MDk3Njc2fQ.wAqreqWPx9anwcxUeoU97yElfljlFs8kYVk8UTte3Sg'
        }
      })
      const result = await response.data
      setTaskData(result.result[0].tasks)
    
    }
    getTaskDataByProjectId()
  }, [project_id])

   useEffect(()=>{
    const getProjectMembers = async()=>{
      if( project_id != null ){
        const response = await axios.get(`${localhost}/project-details-members/${project_id}`)
        const result = await response.data 
        setProjectMember(result.result[0].assignments)
   
      }
      
    }   
    getProjectMembers()
   },[project_id])

   useEffect(()=>{
    const getLogByProjectId = async()=>{
      if( logid == true ){
        const response = await axios.get(`${localhost}/project-details-log/${project_id}`)
        const result = await response.data 
        setLogData(result.result[0].tasks)
        console.log(logData)
      }
    }
    getLogByProjectId()
   },[logid])
  return (
    <>
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