import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TbLogs } from "react-icons/tb";
import AddProject from '../Project/AddProject/AddProject';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const localhost = 'http://localhost:7007'
function Sidebar({ parentFunction,ReverseLogId }) {

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
  
    const [projectData, setProjectData] = useState()
    const handleProjectClick = (project_id) => {
        parentFunction(project_id)
    }
    const handleLogClicked = (project_id) =>{
        ReverseLogId(project_id)
    }
    const handleAddProjectClicked = () =>{
        navigate('/add-new-project')
    }

    useEffect(() => {
        const getProjectData = async () => {
            const response = await axios.get(`${localhost}/project`, {
                headers: {
                    'Authorization': `Bearer ${auth.result.token}`
                }
            })
            const result = await response.data
            setProjectData(result.result)
            console.log(projectData)
        }
        getProjectData()
    }, [])

    return (
        <>

            {projectData ?
                <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ minHeight: '100%',height:'auto' }}>
                        
                    <div class=" d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
                        <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                        <span className="fs-4">Project</span>
                       { role == 1 ?<><span onClick={() => {handleAddProjectClicked()}} style={{marginLeft:'5%',cursor:'pointer'}}><  IoMdAddCircle size={30} color='lightGreen'/></span></> : <></>}   
                    </div>
                   
                    <hr />
                    <ul class="nav nav-pills flex-column mb-auto">
                        {projectData.map((eachProject => (
                            <li className='nav-link'>
                                <h6 onClick={() => { handleProjectClick(eachProject.project_id) }} className='text-info' style={{ cursor: 'pointer' }}>{eachProject.project_id}. {eachProject.project_name}</h6>
                                <div><p onClick={()=>{handleLogClicked(eachProject.project_id)}} className='makelink'>Logs</p> </div>
                                <hr style={{ color: 'grey' }} />
                            </li>
                        )))}
                    </ul>
                    <hr />

                </div>
                : <>
                    <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ minHeight: '100%' }}>
                        <a href="/" class=" d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
                            <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                            <span className="fs-4">Project</span>
                        </a>
                        <hr />
                        <ul class="nav nav-pills flex-column mb-auto">
                            <li class="nav-item">

                            </li>

                        </ul>
                        <hr />

                    </div>
                </>}

        </>
    )
}

export default Sidebar