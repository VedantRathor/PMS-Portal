import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import ProjectDetailComponent from "./LogTable/projectdetailComponent"
import RightProjectDetails from "./rightsideDetails"
import TaskForm from "./TaskForm"
import AssignMembers from "./AssignMembers"
import ProjectData_rhs from "./Project/projectdata_rhs"
import Projectmembers_rhs from "./Projectmembers_rhs"
import Projecttasks_rhs from "./Tasks/ProjectTasks_rhs"


const ProjectDisplay = () => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname , urole ; 
  if( auth != null ){
     uname = auth.result.uname
     urole = auth.result.urole
  }
  const navigate = useNavigate()
  const { pid } = useParams()
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  function parentFunction() {
    console.log('hey in parent')
    forceUpdate()
  }

  const handleBtnClick = (pid) =>{
       navigate(`/create-task/${pid}`)
  }

  const handleTaskClick = (pid) =>{
       navigate(`/project/${pid}/tasks`)
  }
  const handleBtnClickMembers = (pid) =>{
    navigate(`/project/${pid}/assign-members`)
  }

  return (

    <>

      <div className="MainDiv p-3">
        {
          pid ? <>
          <div style={{display:"flex", justifyContent:"center", width:"100%"}}><h3 className="">Showing Result for the Project</h3></div>
            
            <div className="left-container">
              <div className="btn-class-display">
                <button onClick={()=>{handleBtnClick(pid)}} className="button b1 ">Create a Task</button>
               { urole == 3 ? (<></>) : <><button onClick={()=>{handleBtnClickMembers(pid)}} className="button b2 ">Assign Members</button></>} 
                <button onClick={()=>{handleTaskClick(pid)}} className="button b3 ">View Tasks</button>



              </div>
              <div className="logAndproject">
                <div className="LogContainer ">

                  <ProjectDetailComponent pid={pid} />
                 
                </div>
                <div className="fc-pdata-pmembers">
                <ProjectData_rhs pid={pid}/>
                <Projectmembers_rhs pid={pid}/>
                </div>
               
              </div>


             
          
            </div>
         

            {/* <RightProjectDetails pid={pid} /> */}
          </> : <div>loading...</div>
        }



      </div>
    </>



  )

}
export default ProjectDisplay