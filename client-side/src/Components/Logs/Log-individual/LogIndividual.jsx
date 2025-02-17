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
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
const zero = 0
const localhost = 'http://localhost:7007'
function LogIndividual() {
  
  const navigate = useNavigate();

  const location = useLocation();
  const projectId = location.state?.projectId;
  const taskName = localhost.state?.taskName;
  console.log('projectIffd: ',projectId,':',taskName);

  let auth = localStorage.getItem('user');
  auth = JSON.parse(auth);
  let name, role;
  if (auth != null && auth != 'undefined') {
    name = auth.result.name
    role = auth.result.role
    
  }else{
    localStorage.removeItem('user')
    navigate('/Login')
  }

  useEffect(()=>{
    const checkAuth = async() =>{
      let AUTH = localStorage.getItem('user');
      AUTH = await JSON.parse(AUTH);
      if( AUTH ){

      }else{
        localStorage.removeItem('user');
        navigate('/Login');
      }
    }
    checkAuth();
  },[])
  
  const [projectData, setProjectData] = useState()
  const [logData, setLogData] = useState()
  const [selectProjectData, setSelectedProjectData] = useState(projectId || 0);
  const [selectStatus, setStatus] = useState('n')
  const [selectSort,setSelectSort] = useState(0)
  const [selectSearch,setSearch] = useState()

  const [projectLogData, setprojectLogData] = useState()
  const [displayData, setDisplayData] = useState('')
  const [flag, setFlag] = useState(false)
  const [eachTask, setEachTask] = useState()
  const [eachProjectShowData, setProjectShowData] = useState()
  const [refresh,setRefresh] = useState(false)
  const RefreshMe = () =>{
    setRefresh(!refresh)
  }
    const generatePDF = (eachProjectShowData) => {
        let pdfdata = {
          project_id : eachProjectShowData.project_id,
          project_name : eachProjectShowData.project_name,
          project_details : eachProjectShowData.project_details,
          created_at : moment(eachProjectShowData.created_at).format('DD MMM YYYY'),
          updated_at : moment(eachProjectShowData.updated_at).format('DD MMM YYYY'),
          created_by : 'Admin'
        }
       
        axios.post(`http://localhost:7007/generate-pdf`, { data: pdfdata }, { responseType: 'blob' })
            .then((response) => {
                // Create a Blob from the PDF data
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

                // Create a URL for the Blob
                const url = window.URL.createObjectURL(pdfBlob);

                // Create a link element
                const link = document.createElement('a');
                link.href = url;

                // Set the download attribute and filename
                link.setAttribute('download', `${pdfdata.project_name}.pdf`);

                // Append the link to the body
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Cleanup
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch((error) => {
                // Handle error
                console.error('Error generating PDF:', error);
            });
    };
   

  const handleProjectChange = (e) => {
    setSelectedProjectData(e.target.value)
    // console.log(selectProjectData)
  }
  const handleSelectStatus = (e) =>{
    setStatus(e.target.value)
  }
  
  const handleSelectSort = (e) =>{
      setSelectSort(e.target.value)
  }

  const handleSearch = (e) =>{
         setSearch(e.target.value)
  }

  const handleForm = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:7007/project-details-log-allLogs/${selectProjectData}/${selectStatus}/${selectSort}?searchBy=${selectSearch}`,{
        headers:{
          Authorization : `Bearer ${auth.result.token}`
        }
      })
      const result = await response.data
      setLogData(result.result)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefresh = (e) => {
    window.location.reload()
  }

  const parentFunctionDisplayData = (details = '', eachTask, eachProjectShowData) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling effect
    });
    setDisplayData(details)
    setEachTask(eachTask)
    setProjectShowData(eachProjectShowData)
    setFlag(!flag)
  }

  useEffect(() => {
    const getProjectLogData = async () => {
    try {
      const response = await axios.get(`http://localhost:7007/project-details-log-allLogs/${selectProjectData}/${selectStatus}/${selectSort}?searchBy=${selectSearch}`,{
        headers:{
          Authorization : `Bearer ${auth.result.token}`
        }
      })
      const result = await response.data
      setLogData(result.result)
      
    } catch (error) {
      console.log(error)
    }
    }
    getProjectLogData()
  }, [selectProjectData,selectStatus,selectSort,refresh])

  useEffect(() => {
    const getProjectData = async () => {
      const response = await axios.get(`http://localhost:7007/project`, {
        headers: {
          'Authorization': `Bearer ${auth.result.token}`
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
        const response = await axios.get(`http://localhost:7007/project-details-log-allLogs/${selectProjectData}/${selectStatus}/${selectSort}?searchBy=${selectSearch}`,{
          headers:{
            Authorization : `Bearer ${auth.result.token}`
          }
        })
      const result = await response.data
      setLogData(result.result)
      } catch (error) {
        console.log(error)
      }
      

    }

    getAllLogs()
  }, [refresh])
  return (
    <div className='log-individual-container'>
      <h3 style={{ color: 'white', margin: 'auto', width: '100%' }} className='d-flex justify-content-center'>Logs</h3>
      <div className='Logs-all-sorting-searching-feature'>

        <IoIosRefreshCircle onClick={handleRefresh} size={30} className='refresh' />
        <div class="dropdown">

          <select className='dropdown my-select' value={selectProjectData} onChange={handleProjectChange}>
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
          <select className='dropdown my-select' onChange={handleSelectSort}>
            <option value='0' className='dropdown-item'>Sort by Date</option>
            <option value='1' className='dropdown-item'>Recent to oldest</option>
            <option value='2' className='dropdown-item'>Oldest to recent</option>

          </select>
        </div>

        <div class="dropdown">
          <select className='dropdown my-select' onChange={handleSelectStatus} >
            <option value='n' className='dropdown-item'>Status</option>
            <option value='pending' className='dropdown-item'>Pending</option>
            <option value='approved' className='dropdown-item'>Approved</option>
            <option value='rejected' className='dropdown-item'>Rejected</option>
          </select>
        </div>

        <form onSubmit={handleForm} className="form-inline my-2 my-lg-0 d-flex gap-2">
          <input onChange={handleSearch} className="form-control mr-sm-2" type="search" placeholder="Search by Employee Name" aria-label="Search" style={{ width: '100%', padding: '3.4%' }} />
          <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
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
                    <AllLogs RefreshMe={RefreshMe} generatePDF={generatePDF} eachproject={eachproject} eachTask={eachTask} eachLog={eachLog} parentFunctionDisplayData={parentFunctionDisplayData} />
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