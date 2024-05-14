import React from 'react'
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function AllLogs({ eachproject, eachTask, eachLog, parentFunctionDisplayData,generatePDF }) {
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  if (auth != null && auth != 'undefined') {
    name = auth.result.name
    role = auth.result.role
  }else{
    localStorage.removeItem('user')
    navigate('/Login')
  }

  const handleLogDataClick = (logdetails)=>{
    parentFunctionDisplayData(logdetails,null,null)
  }
  const handleTaskClick = (taskdetails)=>{
    parentFunctionDisplayData('',taskdetails,null)
  }
  const handleProjectClick = (projectDetails)=>{
    parentFunctionDisplayData('',null,projectDetails)
  }
  const handleGeneratePDF = (eachproject) =>{
    generatePDF( eachproject)
  }
  return (
    <>
      <tr>
       <td>{eachLog.userinfo.name}</td>
       <td onClick={()=>{handleLogDataClick(eachLog.logdata)}} className='makelink'>{eachLog.logdata}</td>
       <td>{eachLog.start_time.split('T')[0]}</td>
       <td>{eachLog.end_time.split('T')[0]}</td>
       <td>{eachLog.created_at.split('T')[0]}</td>
       <td>{eachLog.updated_at.split('T')[0]}</td>
       <td><span className='makelink' onClick={()=>{handleProjectClick(eachproject)}}>{eachproject.project_name}</span> <span onClick={()=>{handleGeneratePDF(eachproject)}} style={{cursor:'pointer'}}><FaFilePdf color='rgb(255, 152, 152)' size={23}/></span></td>
       <td onClick={()=>{handleTaskClick(eachTask)}} className='makelink'>{eachTask.task_name}</td>
       <td>{eachLog.logstatus == 'pending' ? <CiStopwatch size={30} color='yellow'/> : eachLog.logstatus == 'rejected' ? <RxCross2 size={30} color='red'/> : <ImCheckboxChecked size={25} color='green'/> }</td>
       <td>{eachLog.approved_by ? <span className='badge badge-primary bg-success'>Checked</span>: <p className='badge badge-warning bg-warning text-dark'>Pending</p> }</td>
       
      </tr>
    </>
  )
}

export default AllLogs