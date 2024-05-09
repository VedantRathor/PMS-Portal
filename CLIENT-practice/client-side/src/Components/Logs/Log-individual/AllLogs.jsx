import React from 'react'
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";

function AllLogs({ eachproject, eachTask, eachLog, parentFunctionDisplayData }) {
  const handleLogDataClick = (logdetails)=>{
    parentFunctionDisplayData(logdetails,null,null)
  }
  const handleTaskClick = (taskdetails)=>{
    parentFunctionDisplayData('',taskdetails,null)
  }
  const handleProjectClick = (projectDetails)=>{
    parentFunctionDisplayData('',null,projectDetails)
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
       <td onClick={()=>{handleProjectClick(eachproject)}} className='makelink'>{eachproject.project_name}</td>
       <td onClick={()=>{handleTaskClick(eachTask)}} className='makelink'>{eachTask.task_name}</td>
       <td>{eachLog.logstatus == 'pending' ? <CiStopwatch size={30} color='yellow'/> : eachLog.logstatus == 'rejected' ? <RxCross2 size={30} color='red'/> : <ImCheckboxChecked size={25} color='green'/> }</td>
       <td>{eachLog.approved_by ? 'Checked': 'Pending' }</td>
       
      </tr>
    </>
  )
}

export default AllLogs