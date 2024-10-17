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
import Email from '../Email'
import TASK_COMPLETION from '../Charts/TASK_COMPLETION'
import TaskCompletionChart from '../Charts/TASK_TRACKING'
import ClientSatisfactionChart from '../Charts/CLIENT_SATISFACTION'
import { FiLoader } from "react-icons/fi";
const localhost = 'http://localhost:7007'

function ProjectDetailContainter({ project_id, logid, navigateTask, AddTaskFORMVisibility, OpenMember, openMember }) {

  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  if (auth != null && auth != undefined) {
    name = auth.result.name
    role = auth.result.role
  } else {
    localStorage.removeItem('user')
    navigate('/Login')
  }

  const [singleProjectData, setSingleProjectData] = useState()
  const [logData, setLogData] = useState()
  const [taskData, setTaskData] = useState()
  const [projectMembers, setProjectMember] = useState()
  const [eachTask, setEachTask] = useState()
  const [displayData, setDisplayData] = useState('')
  const [flag, setFlag] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [completed_tasks, setcompleted_tasks] = useState(0);
  const [pending_tasks , setPendingTasks] = useState(0);
  const [projectLogDetails ,setprojectLogDetails] = useState();
  // EMAIL 
  const [openEmail, setEmailVisibility] = useState(false);
  const [email,setEmail] = useState('')
  const ToggleEmailVisibility = (email) =>{
    setEmailVisibility(!openEmail);
    setEmail(email) ; 
    console.log(openEmail,email) ;
  }

  const RefreshMe = () => {
    setRefresh(!refresh)
  }

  const parentFunctionDisplayData = (details = '', eachTask) => {
    setDisplayData(details)
    setEachTask(eachTask)
    setFlag(!flag)
  }
  useEffect(() => {
    const getSingleProjectData = async () => {
      if (project_id != null) {
        const response = await axios.get(`${localhost}/project-details-project/${project_id}`,{
          headers : {
            "Authorization" : `Bearer ${auth.result.token}`
        }
        })
        const result = await response.data
        setSingleProjectData(result.result[0])

      }
    }
    
    const getLogData = async() =>{
      const response = await axios.get(`${localhost}/project-details-log/${project_id}`)
      const result = await response.data
      setprojectLogDetails(result.result);
    } 
   

    getSingleProjectData();
    getLogData();

  }, [project_id]);

  if (navigateTask) {
    localStorage.setItem('projectDetail', JSON.stringify(singleProjectData));

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
       let pending_task_count = 0 , completed_task_count = 0 ;
         for( let task in result?.result[0]?.tasks){
         if( result?.result[0]?.tasks[task].status == 'approved') completed_task_count++;
         else if(result?.result[0]?.tasks[task].status == 'pending') pending_task_count++;
       }  
      //  console.log('ct',completed_task_count);
      //  console.log('pt',pending_task_count);
       setPendingTasks(pending_task_count);
       setcompleted_tasks(completed_task_count);
    }
    getTaskDataByProjectId()
  }, [project_id, refresh])

  useEffect(() => {
    const getProjectMembers = async () => {
      if (project_id != null) {
        const response = await axios.get(`${localhost}/project-details-members/${project_id}`,{
          headers : {
            "Authorization" : `Bearer ${auth.result.token}`
        }
        })
        const result = await response.data;
        await setProjectMember(result.result[0].assignments)
        // console.log('projectMembers',result.result[0].assignments);
      }

    }
    getProjectMembers();
  }, [project_id, refresh])

  useEffect(() => {
    const getLogByProjectId = async () => {
     
        const response = await axios.get(`${localhost}/project-details-log/${project_id}`)
        const result = await response.data
        setLogData(result.result[0].tasks);
        console.log('loglog',logData);
    }
    getLogByProjectId()
  }, [logid]);
  
  return (
    <>
    
      {openEmail ?<Email ToggleEmailVisibility={ToggleEmailVisibility} email = {email} /> : <></>}
      {navigateTask ? <div><TaskForm RefreshMe={RefreshMe} project_id={project_id} AddTaskFORMVisibility={AddTaskFORMVisibility} /></div> : <></>}
      {openMember ? <div><AddMembers RefreshMe={RefreshMe} project_id={project_id} OpenMember={OpenMember} /></div> : <></>}
      <div className='display' style={{ color: 'white', visibility: flag ? 'visible' : 'hidden' }}>
        <Display eachTask={eachTask} parentFunctionDisplayData={parentFunctionDisplayData} details={displayData} />
      </div>
      <ProjectInfo parentFunctionDisplayData={parentFunctionDisplayData} singleProjectData={singleProjectData} />
      {logid == true && logData ?
        <>
          <div className='task-and-members'>
            <div className='task-container'>
              <LogData parentFunctionDisplayData={parentFunctionDisplayData} logData={logData} />
            </div>
          </div>
        </>
        : taskData && taskData.length != 0 ?
        
            <div className='task-and-members'>
              <div className='task-container'>
                <Task parentFunctionDisplayData={parentFunctionDisplayData} taskData={taskData} />
                {projectMembers && projectMembers.length != 0 ? 
                <div className='d-flex gap-4'>
                  < ProjectMembers ToggleEmailVisibility={ToggleEmailVisibility} projectMembers={projectMembers} />   
                  <div className="d-flex flex-column mt-5" style={{width:'50%'}} >
                    
                    <div className='d-flex justify-content-center align-items-center gap-4'>
                    { pending_tasks != 0 || completed_tasks != 0 ?<TASK_COMPLETION pendingTasks={pending_tasks} completedTasks={completed_tasks}/> : <><div className='backdrop'><FiLoader/></div></> }  
                   
                   { taskData && taskData.length != 0 ? <TaskCompletionChart tasks ={taskData}/> : <></>}
                    </div>
                    

                    <div className='mt-5 p-2 d-flex justify-content-center align-items-center' style={{width:'90%'}}> { projectLogDetails && projectLogDetails.length != 0 ? <ClientSatisfactionChart projects={projectLogDetails}/>: <></>}
                    </div>
                     

                    {/* <div className='d-flex justify-content-around align-items-center' style={{width:'100%',height:'20%',padding:'2%'}}>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                    </div>

                    <div className='d-flex justify-content-around align-items-center' style={{width:'100%',height:'20%',padding:'2%'}}>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                    </div>

                    <div className='d-flex justify-content-around align-items-center' style={{width:'100%',height:'20%',padding:'2%'}}>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                      <div style={{width:'45%',border:'2px solid red',height:'100%'}}></div>
                    </div> */}
                    
                  </div>

                  
                  
                </div>
                 
                : <></>}
              </div>
        </div>
          
          
          : <>No Data Available</>}


    </>
  )
}

export default ProjectDetailContainter