import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AllLogs from './AllLogs'
import { CiCircleInfo } from "react-icons/ci";
import { FaBookOpen } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import Display from '../../Display';
import { IoIosRefreshCircle } from "react-icons/io";
const zero = 0
const localhost = 'http://localhost:7007'
function LogIndividual() {
  const [projectData, setProjectData] = useState()
  const [logData, setLogData] = useState()
  const [selectProjectData, setSelectedProjectData] = useState()
  const [selectStatus, setStatus] = useState('n')

  const [projectLogData, setprojectLogData] = useState()
  const [displayData, setDisplayData] = useState('')
  const [flag, setFlag] = useState(false)
  const [eachTask, setEachTask] = useState()
  const [eachProjectShowData, setProjectShowData] = useState()

  const handleProjectChange = (e) => {
    setSelectedProjectData(e.target.value)
    // console.log(selectProjectData)
  }
  const handleSelectStatus = (e) =>{
    setStatus(e.target.value)
  }

  const handleRefresh = (e) => {
    window.location.reload()
  }

  const parentFunctionDisplayData = (details = '', eachTask, eachProjectShowData) => {
    setDisplayData(details)
    setEachTask(eachTask)
    setProjectShowData(eachProjectShowData)
    setFlag(!flag)
  }

  useEffect(() => {
    const getProjectLogData = async () => {
    try {
      const response = await axios.get(`${localhost}/project-details-log-allLogs/${selectProjectData}/${selectStatus}`)
      const result = await response.data
      setLogData(result.result)
    } catch (error) {
      console.log(error)
    }
    }
    getProjectLogData()
  }, [selectProjectData,selectStatus])

  useEffect(() => {
    const getProjectData = async () => {
      const response = await axios.get(`${localhost}/project`, {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTcxNTIzNTkwNywiZXhwIjoxNzE1NDA4NzA3fQ.idY5ylUE-HYWbB2CluChgXdl1WV84xLrN4OBa2mWJXk`
        }
      })
      const result = await response.data
      setProjectData(result.result)
    }
    getProjectData()
  }, [])

  useEffect(() => {
    const getAllLogs = async () => {
      try {
        const response = await axios.get(`${localhost}/project-details-log-allLogs/${zero}/${selectStatus}`)
      const result = await response.data
      setLogData(result.result)
      } catch (error) {
        console.log(error)
      }
      

    }

    getAllLogs()
  }, [])
  return (
    <div className='log-individual-container'>
      <h3 style={{ color: 'white', margin: 'auto', width: '100%' }} className='d-flex justify-content-center'>Logs</h3>
      <div className='Logs-all-sorting-searching-feature'>

        <IoIosRefreshCircle onClick={handleRefresh} size={30} className='refresh' />
        <div class="dropdown">

          <select className='dropdown my-select' onChange={handleProjectChange}>
            <option value='0' className='dropdown-item'>Select Project</option>
            {
              projectData && projectData.length != 0 ?
                projectData.map((eachProject) => (
                  <option value={eachProject.project_id} className='dropdown-item'>{eachProject.project_name}</option>
                ))
                : <></>
            }


          </select>
        </div>

        <div class="dropdown">
          <select className='dropdown my-select' >
            <option className='dropdown-item'>Sort by Date</option>
            <option className='dropdown-item'>Recent to oldest</option>
            <option className='dropdown-item'>Oldest to recent</option>

          </select>
        </div>

        <div class="dropdown">
          <select className='dropdown my-select' onChange={handleSelectStatus} >
            <option value='' className='dropdown-item'>Status</option>
            <option value='pending' className='dropdown-item'>Pending</option>
            <option value='approved' className='dropdown-item'>Approved</option>
            <option value='rejected' className='dropdown-item'>Rejected</option>
          </select>
        </div>

        <form className="form-inline my-2 my-lg-0 d-flex gap-2">
          <input className="form-control mr-sm-2" type="search" placeholder="Search by Employee Name" aria-label="Search" style={{ width: '40rem', padding: '1.4%' }} />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>

      <div className='log-show-container'>
        <div className='display2' style={{ color: 'white', visibility: flag ? 'visible' : 'hidden' }}>
          <Display eachTask={eachTask} eachProjectShowData={eachProjectShowData} parentFunctionDisplayData={parentFunctionDisplayData} details={displayData} />
        </div>
        <table style={{ border: '1px solid rgb(98, 92, 92)' }} class="table table-dark table-hover">
          <thead>

            <h5 style={{ paddingLeft: '10px', color: 'white', backgroundColor: '', marginBottom: '0px' }} >Log Details <FaTasks size={35} color='yellow' style={{ borderRadius: '1px', background: 'transparent' }} /></h5>

            <tr>

              <th scope="col">Name</th>
              <th scope="col" className='text d-flex align-center ' style={{ textDecoration: '', }}>Log Details </th>
              <th scope="col">Start-Time</th>
              <th scope="col">End-Time</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Project</th>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Approval</th>

            </tr>
          </thead>
          <tbody>
            {logData && logData.length != 0 ?
              logData.map((eachproject) => (
                eachproject.tasks.map((eachTask) => (
                  eachTask.logs.map((eachLog) => (
                    <AllLogs eachproject={eachproject} eachTask={eachTask} eachLog={eachLog} parentFunctionDisplayData={parentFunctionDisplayData} />
                  ))
                ))
              ))
              : <>No Logs Available</>}
          </tbody>
        </table>


      </div>

    </div>
  )
}

export default LogIndividual