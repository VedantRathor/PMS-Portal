import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import ProjectDetailComponent from "./LogTable/projectdetailComponent"
import RightProjectDetails from "./rightsideDetails"
import TaskForm from "./Tasks/TaskForm"
import AssignMembers from "./AssignMembers"
import ProjectData_rhs from "./Project/projectdata_rhs"
import Projectmembers_rhs from "./Projectmembers_rhs"
import Projecttasks_rhs from "./Tasks/ProjectTasks_rhs"


const ProjectDisplay = () => {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)
  let uname, urole;
  if (auth != null) {
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

  const handleBtnClick = (pid) => {
    navigate(`/create-task/${pid}`)
  }

  const handleTaskClick = (pid) => {
    navigate(`/project/${pid}/tasks`)
  }
  const handleBtnClickMembers = (pid) => {
    navigate(`/project/${pid}/assign-members`)
  }

  return (

    <>
      <p className="link" onClick={() => navigate(-1)}>Back</p>
      <div className="MainDiv p-3">
        {
          pid ? <>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" ,borderBottom:"1px solid black"}}><h3 className="">Showing Result for the Project</h3></div>

            <div className="left-container">


              <div className="logAndproject">
                <div className="LogContainer ">

                  <ProjectDetailComponent pid={pid} />

                </div>
                <div className="fc-pdata-pmembers">
                  <ProjectData_rhs pid={pid} />
                  <Projectmembers_rhs pid={pid} />
                </div>

              </div>

              <div className="btn-class-display">

                <button onClick={() => { handleBtnClick(pid) }} className="btn btn-md btn-primary">Create a Task</button>
                {urole == 3 ? (<></>) : <><button onClick={() => { handleBtnClickMembers(pid) }} className="btn btn-md btn-warning">Assign Members</button></>}
                <button onClick={() => { handleTaskClick(pid) }} className="btn btn-md btn-dark">View Tasks</button>

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