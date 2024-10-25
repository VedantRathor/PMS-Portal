import React, { useEffect, useState } from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { useAsyncError, useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';
const localhost = "http://localhost:7007"

function Task({RefreshMe, taskData, parentFunctionDisplayData, openTaskContainer,project_id ,projectId,projectId2,hide = 'false',taskStatus,taskOrdering,taskQueryName}) {
  let imageUrl = `${localhost}/uploaded-image/`;
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  const [pid,setProjectid] = useState(project_id);
  const [movingProjectId, setMovingProjectId ] = useState(projectId || '');
  const [movingprojectId2,setMovingprojectId2] = useState(projectId2||'');
  useEffect(() => {
    if (auth != null && auth != undefined) {
      name = auth.result.name
      role = auth.result.role
    } else {

      localStorage.removeItem('user')
      navigate('/login')
    }

  }, [])

  useEffect( ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
      });
},[project_id]);

  const handleTaskStatus = async(task_id, status) => {
    console.log(task_id,status)
    let response = await axios.post(`http://localhost:7007/update-task-status`,{
      task_id : task_id,
      status : status,
      project_id:pid
    },{
      headers : {
        'Authorization' : `Bearer ${auth.result.token}`
      }
    })
    let result = await response.data 
    console.log(result)
    RefreshMe()
  }

  const handleTaskDetailClick = (taskdetails) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    parentFunctionDisplayData(taskdetails)
  }

  const handleAddLog = (project_id, task_id, eachProject) => {
    openTaskContainer(project_id, task_id, eachProject)
  }

  const moveToTask = (project_id) => {
    if (project_id) {
      // Navigate to /task/{project_id} if project_id exists
      // console.log('first',project_id);
      navigate(`/task`, { state: { projectId: project_id } });
    } else {
      // Navigate to /task if project_id is not provided
      navigate('/task');
    }
  }

  const handleViewLogs = (projectId, taskName) =>{
    console.log('projectid: ',projectId,'taskdata: ',taskName);
    navigate('/Logs',{state:{projectId,taskName}});
  }

  return (
    <> 
   
      <div>
       
        { hide == 'true' ? <></> : <span onClick={()=>{moveToTask(movingProjectId)}} style={{cursor:'pointer',float:'right'}} className='text-danger'><u>view in detail</u></span>}
      <table style={{ border: '1px solid rgb(98, 92, 92)' }} class="table table-dark table-hover">
        <thead>

          <h5 style={{ paddingLeft: '10px', color: 'white', backgroundColor: '', marginBottom: '0px' }} >Task Details <FaTasks size={35} color='yellow' style={{ borderRadius: '1px', background: 'transparent' }} /> </h5>

          <tr style={{fontSize:'15.2px'}}>

            <th scope="col">Name</th>
            <th scope="col" className='text  ' style={{ textDecoration: '', }}>Details </th>
            <th scope="col">Created By</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Updated By</th>
            <th scope="col">Status</th>
            {auth && auth != null && auth != undefined && auth.result.role == 3 ? <th scope='col' style={{ color: 'lightGreen' }}>Add Log</th> : <></>}
            {auth && auth != null && auth != undefined && auth.result.role != 3 ? <th scope='col'>Update</th> : <></>}
          </tr>
        </thead>
        <tbody style={{fontSize:'15.1px'}}>
          {
            taskData.map((eachTask => (
              <tr>
                <td>{eachTask.task_name}</td>
                <td><CiCircleInfo onClick={() => { handleTaskDetailClick(eachTask.task_details) }} style={{ color: '#0d6efd', cursor: 'pointer' }} className='text-info' size='25' /> {eachTask.task_details}</td>
                <td>
                 <div className='d-flex align-items-center gap-2'>
                   <div className="profile-image-container2">
                     {eachTask?.userinfo?.profile ? <img src={`${imageUrl}${eachTask?.userinfo?.profile}`} alt="Profile" className="profile-image2" /> : <img src={imageUrl} alt="Profile" className="profile-image2" />}
                   </div>
                   {eachTask.userinfo.name}
                 </div>
                 

               </td>
                <td>{moment(eachTask.created_at).format('DD MMM YYYY')}</td>
                <td>{moment(eachTask.updated_at).format('DD MMM YYYY')}</td>
                {eachTask.updated_by ? <td>{eachTask.updated_by}</td> : <td>No Updates</td>}
                {eachTask.status == 'pending' ? <td ><div className='badge badge-primary bg-warning text-dark'>Ongoing</div></td> : eachTask.status == 'approved' ? <td><div className='badge badge-primary bg-success text-alice'>Completed</div></td> : <td><FaCheckCircle size={27} color='lightGreen' /></td>}
                {auth && auth != null && auth != undefined && auth.result.role == 3 ? <td style={{ textAlign: 'center' }}><IoIosAddCircle size={30} color='lightGreen' style={{ cursor: 'pointer' }} onClick={() => { handleAddLog(eachTask.project_id, eachTask.task_id, eachTask) }} /></td> : <></>}
                {auth && auth.result.role != 3 ?
                  <td>
                    <div className='d-flex gap-2 justify-content-center align-content-center '>
                      <FaCheckCircle onClick={() => { handleTaskStatus(eachTask.task_id, 'approved') }} size={23} color='lightGreen' style={{ cursor: 'pointer' }} />
                      <CiStopwatch onClick={() => { handleTaskStatus(eachTask.task_id, 'pending') }} size={27} color='yellow' style={{ cursor: 'pointer' }} />
                    </div>
                    <p  onClick={()=>{handleViewLogs(movingprojectId2,eachTask.task_name)}} style={{cursor:'pointer',display:'none'}} className='text-danger'><u>view logs</u></p>
                  </td>
                  : <></>}
                 
              </tr>
            )))
          }
        </tbody>
      </table>
      </div>
      
    </>
  )
}

export default Task