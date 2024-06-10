import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Display from '../../Display'
import Task from '../Task'
import { useNavigate } from 'react-router-dom'
import LogTaskAdd from '../../AddLogTask/LogTaskAdd'




const localhost = 'http://localhost:7007'
function Tast_Individual() {

    const navigate = useNavigate()
    let auth = localStorage.getItem('user')
    auth = JSON.parse(auth)
    let name, role;

    useEffect(()=>{
        if (auth != null && auth != undefined) {
            name = auth.result.name
            role = auth.result.role
          }else{
             
              localStorage.removeItem('user')
              navigate('/login')
          }
          
    },[])
    
    
    const [projectData, setProjectData] = useState()
    const [selectProjectData, setSelectedProjectData] = useState()
    const [taskData, setTaskData] = useState()
    const [displayData, setDisplayData] = useState('')
    const [flag, setFlag] = useState(false)
    const [eachTask,setEachTask] = useState()
    const [openAddTask,setopenAddTask] = useState(false)
    const [project_id,setProjectID] = useState() 
    const [task_id,setTaskID] = useState() 
    const [item,setItem] = useState()
    const [refresh,setRefresh] = useState(false) 
    const RefreshMe = () =>{
        setRefresh(!refresh)
    }

    const openTaskContainer = (project_id,task_id,eachTask) =>{        
        if( eachTask != null && eachTask != undefined ){
          setItem(eachTask)
        }else{
          setItem(null)
        }
        setProjectID(project_id)
        setTaskID(task_id)
        setopenAddTask(!openAddTask)
    }

    const parentFunctionDisplayData = (details = '', eachTask) => {
        setDisplayData(details)
        setEachTask(eachTask)
        setFlag(!flag)
    }
    const handleProjectChange = (e) => {
        setSelectedProjectData(e.target.value)
    }

    useEffect(() => {
        const getTaskByProjectID = async () => {
            const response = await axios.get(`${localhost}/project-details-task/${selectProjectData}`, {
                headers: {
                    'Authorization': `Bearer ${auth.result.token}`
                }
            })
            const result = await response.data
            setTaskData(result.result[0].tasks)
      
        }
        getTaskByProjectID()
    }, [selectProjectData,refresh])

    useEffect(() => {
        const getProjectData = async () => {
            const response = await axios.get(`${localhost}/project`, {
                headers: {
                    'Authorization': `Bearer ${auth.result.token}`
                }
            })
            const result = await response.data
            setProjectData(result.result)
        }
        getProjectData()
    }, [])

    return (
        <div className='task-individual-container'>
    
        
            <div className='task-all-sorting-searching-feature'>
                <div class="dropdown">
                    <select className='dropdown my-select' onChange={handleProjectChange}>
                        <option value='' className='dropdown-item'>Select Project</option>
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
                        <option className='dropdown-item'>Sort by</option>
                        <option className='dropdown-item'>PIRA</option>
                        <option className='dropdown-item'>DIRA</option>
                        <option className='dropdown-item'>MIRA</option>
                    </select>
                </div>

                <div class="dropdown">
                    <select className='dropdown my-select' >
                        <option className='dropdown-item'>Status</option>
                        <option className='dropdown-item'>PIRA</option>
                        <option className='dropdown-item'>DIRA</option>
                        <option className='dropdown-item'>MIRA</option>
                    </select>
                </div>

                <form className="form-inline my-2 my-lg-0 d-flex gap-2">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '40rem', padding: '1.4%' }} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
           
            <div className='task-show-container'>
                { project_id != null && project_id != undefined ?<div  style={{visibility: openAddTask ? 'visible' : 'hidden'}} ><LogTaskAdd project_id={project_id} task_id={task_id} item={item} openTaskContainer={openTaskContainer} /></div> : <></>}
               
            <div className='display2' style={{ color: 'white', visibility: flag ? 'visible' : 'hidden' }}>
                <Display eachTask={eachTask} parentFunctionDisplayData={parentFunctionDisplayData} details={displayData} />
            </div>
           {taskData && taskData.length != 0 ? <Task project_id={selectProjectData} RefreshMe={RefreshMe} openTaskContainer={openTaskContainer} parentFunctionDisplayData={parentFunctionDisplayData} taskData={taskData}/> : <h5 className='text-white text-center     '>Please Select a <b>project!    </b></h5> } 
            </div>
        </div>
    )
}

export default Tast_Individual