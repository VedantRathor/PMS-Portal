import React, { useState } from 'react'
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { FaFilePdf } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";

import axios from 'axios';
const localhost = 'http://localhost:7007'

function AllLogs({ eachproject, eachTask, eachLog, parentFunctionDisplayData, generatePDF, RefreshMe }) {
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let name, role;
  if (auth != null && auth != 'undefined') {
    name = auth.result.name
    role = auth.result.role
  } else {
    localStorage.removeItem('user')
    navigate('/Login')
  }

  const [editClicked,setEditClicked] = useState(false)
  const [log_idClicked,setlogID] = useState()

  const handleEditClicked = (log_id) =>{
    setEditClicked(!editClicked) ;
    setlogID(log_id)
  }

  const handleLogDataClick = (logdetails) => {
    setEditClicked(false) ;
    setlogID(null) ;
    parentFunctionDisplayData(logdetails, null, null);
  }
  const handleTaskClick = (taskdetails) => {
    setEditClicked(false) ;
    setlogID(null) ;
    parentFunctionDisplayData('', taskdetails, null)
  }
  const handleProjectClick = (projectDetails) => {
    setEditClicked(false) ;
    setlogID(null) ;
    parentFunctionDisplayData('', null, projectDetails)
  }
  const handleGeneratePDF = (eachproject) => {
    setEditClicked(false) ;
    setlogID(null) ;
    generatePDF(eachproject)
  }

  const handleLogStatus = async (logstatus, log_id) => {
    setEditClicked(false) ;
    setlogID(null) ;
    let response = await axios.post(`${localhost}/update-log-status`, {
      log_id: log_id,
      logstatus: logstatus
    }, {
      headers: {
        'Authorization': `Bearer ${auth.result.token}`
      }
    })
    let result = await response.data
    if (result.status == 'success') {
      alert('Log Status has been updated!')
    } else {
      alert('Log status cannot be updated, try again later!')
    }
    RefreshMe()
  }
  return (
    <>
      <tr>
        <td>{eachLog.userinfo.name}</td>
        <td onClick={() => { handleLogDataClick(eachLog.logdata) }} className='makelink'>{eachLog.logdata}</td>
        <td style={{ color: "yellow" }}>{eachLog.start_time.split('T')[0]}</td>
        <td style={{ color: "yellow" }}>{eachLog.end_time.split('T')[0]}</td>
        <td>{eachLog.created_at.split('T')[0]}</td>
        <td>{eachLog.updated_at.split('T')[0]}</td>
        <td><span className='makelink' onClick={() => { handleProjectClick(eachproject) }}>{eachproject.project_name}</span> <span onClick={() => { handleGeneratePDF(eachproject) }} style={{ cursor: 'pointer' }}><FaFilePdf color='rgb(255, 152, 152)' size={23} /></span></td>
        <td onClick={() => { handleTaskClick(eachTask) }} className='makelink'>{eachTask.task_name}</td>
        <td>{eachLog.logstatus == 'pending' ? <CiStopwatch size={30} color='yellow' /> : eachLog.logstatus == 'rejected' ? <RxCross2 size={30} color='red' /> : <ImCheckboxChecked size={25} color='green' />}</td>
        <td>
          {eachLog.logstatus == 'pending' ?
            <div>
              <p className='badge badge-warning bg-warning text-dark'>Pending</p>
              <div>
                {role != 3 ?
                  <div className='d-flex gap-3'>
                    <FaCheckCircle onClick={() => { handleLogStatus('approved', eachLog.log_id) }} style={{ cursor: 'pointer' }} size={24} color='lightGreen' />
                    < RxCross1 onClick={() => { handleLogStatus('rejected', eachLog.log_id) }} style={{ cursor: 'pointer' }} size={24} color='red' />
                  </div>
                  : <></>}
              </div>

            </div>
            : <div>
              <span className='badge badge-primary bg-success'>Checked</span>
             { role != 3 ? <FiEdit2 onClick={()=>{handleEditClicked(eachLog.log_id)}} style={{marginLeft:'7%',color:'yellow',cursor:'pointer'}} size={18}/> : <></>}
              <div>
                {role != 3 && editClicked && log_idClicked == eachLog.log_id?
                  <div className='d-flex gap-3'>
                    <FaCheckCircle onClick={() => { handleLogStatus('approved', eachLog.log_id) }} style={{ cursor: 'pointer' }} size={24} color='lightGreen' />
                    < RxCross1 onClick={() => { handleLogStatus('rejected', eachLog.log_id) }} style={{ cursor: 'pointer' }} size={24} color='red' />
                  </div>
                  : <></>}
              </div>

            </div>
          }
        </td>

      </tr>
    </>
  )
}

export default AllLogs