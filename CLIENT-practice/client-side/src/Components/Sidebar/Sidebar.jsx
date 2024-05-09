import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TbLogs } from "react-icons/tb";
const localhost = 'http://localhost:7007'
function Sidebar({ parentFunction,ReverseLogId }) {
    const [projectData, setProjectData] = useState()
    const handleProjectClick = (project_id) => {
        parentFunction(project_id)
    }
    const handleLogClicked = (project_id) =>{
        ReverseLogId(project_id)
    }

    useEffect(() => {
        const getProjectData = async () => {
            const response = await axios.get(`${localhost}/project`, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppZ2FyQGdtYWlsLmNvbSIsImlhdCI6MTcxNDkyNDg3NiwiZXhwIjoxNzE1MDk3Njc2fQ.wAqreqWPx9anwcxUeoU97yElfljlFs8kYVk8UTte3Sg'
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
                    <a href="/" class=" d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ">
                        <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                        <span className="fs-4">Project</span>
                    </a>
                    <hr />
                    <ul class="nav nav-pills flex-column mb-auto">
                        {projectData.map((eachProject => (
                            <li className='nav-link'>
                                <h6 onClick={() => { handleProjectClick(eachProject.project_id) }} className='text-info' style={{ cursor: 'pointer' }}>{eachProject.project_id}. {eachProject.project_name}</h6>
                                <div><p onClick={()=>{handleLogClicked(eachProject.project_id)}} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Logs<TbLogs color='yellow' /></p> </div>
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