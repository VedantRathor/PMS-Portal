import SideBar from "./sidebar"
import ProjectDisplay from "../projectDisplay"
import { useState, useReducer, react, useEffect } from "react"
import EachProjectCard from "./EachProjectCard"
import { useNavigate, Navigate, Link, useActionData } from 'react-router-dom'
import axios from 'axios'

import Dropdown from "../Buttons/Dropdown"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { auto } from "@popperjs/core"
const localhost = "http://localhost:7007"

const ProjectContainer = () => {

  //  let [pid,setPid] = useState(1)
  //  const [ignored, forceUpdate] = useReducer(x => x + 1, 0) 
  //  function parentFunction() {
  //   console.log('hey in parent')
  //   forceUpdate()
  // }
  const [selectedValue, setSelectedValue] = useState();
  const [selectedSortValue, setSelectedSortValue] = useState();
  const [projectName, setProjectName] = useState();
  const [projectData, setProjectData] = useState()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const parentFunction = () => {
    forceUpdate()
  }

  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname, urole;
  if (auth != null) {
    uname = auth.result.uname
    urole = auth.result.urole
  }
  // getProjectByMid 
  useEffect(() => {
    const getProjectDataByMid = async () => {
      let response
      try {
        if (selectedValue == 'Pending') {
          response = await axios.get('http://localhost:7007/project-sort?sortby=pending', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else if (selectedValue == 'Completed') {
          response = await axios.get('http://localhost:7007/project-sort?sortby=completed', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else if (selectedSortValue == 'casc' || selectedSortValue == 'cdesc' || selectedSortValue == 'uasc' || selectedSortValue == 'udesc') {
          response = await axios.get(`http://localhost:7007/project-order?orderby=${selectedSortValue}`, {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        } else {
          response = await axios.get('http://localhost:7007/project', {
            headers: {
              Authorization: `Bearer ${auth.result.token}`
            }
          })
        }

        let result = await response.data
        console.log(result)
        if (result.status == 'unsuccess') {

          navigate('/')
        } else {
          // everything is fine data to hai hi
          setProjectData(result.result)
        }

      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }
    getProjectDataByMid()
  }, [selectedValue, selectedSortValue, ignored])


  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };
  const handleSortChange = (e) => {
    setSelectedSortValue(e.target.value)

  }

  const handleProjectName = (e) => {
    setProjectName(e.target.value)
  }

  const handleSearchForm = async (e) => {
    e.preventDefault()
    try {
      if (projectName == null) {
        alert('Please Search Something.')
      } else {
        let response = await axios.get(`${localhost}/project/query?val=${projectName}`, {
          headers: {
            Authorization: `Bearer ${auth.result.token}`
          }
        })
        let result = await response.data
        console.log(result)
        if (result.status == 'unsuccess') {
          localStorage.clear()
          navigate('/')
        } else {
          // everything is fine data to hai hi
          setProjectData(result.result)
        }
      }
    } catch (error) {
      navigate('/')
    }
  }
  return (
    <>
     <p className="link" onClick={() => navigate(-1)}>Back</p> 
      <div style={{ width: '60%', margin: 'auto' , marginTop:'20px' }} className="d-flex align-items-center justify-content-start gap-4">
     
        <div>
          <div className="d-flex  align-items-center justify-content-around" style={{ gap: '20px' }}>
            <h5 style={{}}>Filter by status:</h5>
            <select style={{ padding: '1px', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',borderRadius:'10px' }} value={selectedValue} onChange={handleChange}>
              <option value="">All Projects</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          {/* {selectedValue && <p>Showing <b>{selectedValue}</b> Projects</p>} */}
        </div>

       
        <div className="d-flex  align-items-center justify-content-around" style={{ gap: '20px' }}>
        <h5 style={{}}>Order by:</h5>
          <select  style={{ padding: '1px', width: '100px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center',borderRadius:'10px' }} value={selectedSortValue} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="casc">start date- asc</option>
            <option value="cdesc">start date- desc</option>
            <option value="uasc">updated date- asc</option>
            <option value="udesc">updated date- desc</option>

          </select>
        </div>

      </div>

      <div style={{ margin: 'auto', width: '60%', height: 'auto', marginBottom: '20px' }}>
        <form onSubmit={handleSearchForm} class="d-flex" style={{ height: '40px', marginTop:'9px' }}>
          <input onChange={handleProjectName} class="form-control me-2" type="text" placeholder="Search project by name" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>

      <div className="each-project-card-container">
      {projectData ? projectData.length ? projectData.map((eachProject => (
       
          <EachProjectCard parentFunction={parentFunction} eachPro={eachProject} />

      


      ))) : <h1 style={{ textAlign: 'center' }}> 0 results Found</h1>

        : <h1>Loading....</h1>}
        </div>
    </>
  )
}
export default ProjectContainer