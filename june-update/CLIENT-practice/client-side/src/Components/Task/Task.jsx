import React, { useEffect, useState } from 'react'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import axios from 'axios';
const localhost = "http://localhost:7007"
function Task({RefreshMe, taskData, parentFunctionDisplayData, openTaskContainer,project_id }) {

  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  const [pid,setProjectid] = useState(project_id)
  useEffect(() => {
    if (auth != null && auth != undefined) {
      name = auth.result.name
      role = auth.result.role
    } else {

      localStorage.removeItem('user')
      navigate('/login')
    }

  }, [])

  const handleTaskStatus = async(task_id, status) => {
    console.log(task_id,status)
    let response = await axios.post(`${localhost}/update-task-status`,{
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
    parentFunctionDisplayData(taskdetails)
  }

  const handleAddLog = (project_id, task_id, eachProject) => {
    openTaskContainer(project_id, task_id, eachProject)
  }
  return (
    <>
      <table style={{ border: '1px solid rgb(98, 92, 92)' }} class="table table-dark table-hover">
        <thead>

          <h5 style={{ paddingLeft: '10px', color: 'white', backgroundColor: '', marginBottom: '0px' }} >Task Details <FaTasks size={35} color='yellow' style={{ borderRadius: '1px', background: 'transparent' }} /></h5>

          <tr>

            <th scope="col">Name</th>
            <th scope="col" className='text d-flex align-center ' style={{ textDecoration: '', }}>Details </th>
            <th scope="col">Created By</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Updated By</th>
            <th scope="col">Status</th>
            {auth && auth != null && auth != undefined && auth.result.role == 3 ? <th scope='col' style={{ color: 'lightGreen' }}>Add Log</th> : <></>}
            {auth && auth != null && auth != undefined && auth.result.role != 3 ? <th scope='col'>Update</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {
            taskData.map((eachTask => (
              <tr>
                <td>{eachTask.task_name}</td>
                <td><CiCircleInfo onClick={() => { handleTaskDetailClick(eachTask.task_details) }} style={{ color: 'blue', cursor: 'pointer' }} className='text-alice' size='25' /> {eachTask.task_details}</td>
                <td>{eachTask.userinfo.name}</td>
                <td>{eachTask.created_at.split('T')[0]}</td>
                <td>{eachTask.updated_at.split('T')[0]}</td>
                {eachTask.updated_by ? <td>{eachTask.updated_by}</td> : <td>No Updates</td>}
                {eachTask.status == 'pending' ? <td ><div className='badge badge-primary bg-warning text-dark'>Ongoing</div></td> : eachTask.status == 'approved' ? <td><div className='badge badge-primary bg-success text-alice'>Completed</div></td> : <td><FaCheckCircle size={27} color='lightGreen' /></td>}
                {auth && auth != null && auth != undefined && auth.result.role == 3 ? <td style={{ textAlign: 'center' }}><IoIosAddCircle size={30} color='lightGreen' style={{ cursor: 'pointer' }} onClick={() => { handleAddLog(eachTask.project_id, eachTask.task_id, eachTask) }} /></td> : <></>}
                {auth && auth.result.role != 3 ?
                  <td>
                    <div className='d-flex gap-2 justify-content-center align-content-center '>
                      <FaCheckCircle onClick={() => { handleTaskStatus(eachTask.task_id, 'approved') }} size={23} color='lightGreen' style={{ cursor: 'pointer' }} />
                      <CiStopwatch onClick={() => { handleTaskStatus(eachTask.task_id, 'pending') }} size={27} color='yellow' style={{ cursor: 'pointer' }} />
                    </div>
                  </td>
                  : <></>}
              </tr>
            )))
          }
        </tbody>
      </table>
    </>
  )
}

export default Task